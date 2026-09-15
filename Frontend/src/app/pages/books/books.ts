import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs';
import { Book, BooksResponse, SingleBookResponse } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books',
  imports: [ReactiveFormsModule],
  templateUrl: './books.html',
  styleUrl: './books.scss',
})
export class Books implements OnInit {
  private readonly bookService = inject(BookService);

  protected books = signal<Book[]>([]);
  protected isEditModeEnabled = signal<boolean>(false);

  protected bookForm = new FormGroup({
    bookId: new FormControl<null | undefined | string>(null),
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    shelf: new FormControl('', Validators.required),
    copies: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
  });

  public ngOnInit() {
    this.initilizeComponent();
  }

  private initilizeComponent() {
    this.bookService
      .getAllBooks()
      .pipe(
        tap((response) => {
          this.books.set(response.data || []);
        }),
      )
      .subscribe();
  }

  protected saveForm() {
    const bookFromValues = this.bookForm.value;
    const bookPayload: Book = {
      book_title: bookFromValues.title || '',
      book_description: bookFromValues.description || '',
      book_author: bookFromValues.author || '',
      book_shelf: bookFromValues.shelf || '',
      book_total_copies: bookFromValues.copies || 0,
    };

    this.bookService
      .addBook(bookPayload)
      .pipe(
        tap((response: SingleBookResponse) => {
          if (response.success === true) {
            this.books.update((currentBooks) => {
              return [...currentBooks, response.data!];
            });
          }
        }),
        tap(() => {
          this.resetForm();
        }),
      )
      .subscribe();
  }

  protected resetForm() {
    this.bookForm.reset();
  }

  protected onDeleteClick(book_id: string) {
    this.bookService
      .deleteBook(book_id)
      .pipe(
        tap((response: BooksResponse) => {
          if (response.success === true) {
            const tempBookArray = this.books().filter((book) => {
              return book.book_id !== book_id;
            });
            this.books.set(tempBookArray);
          }
        }),
      )
      .subscribe();
  }

  protected onEditButtonClick(book: Book) {
    this.isEditModeEnabled.set(true);
    this.bookForm.patchValue({
      bookId: book.book_id,
      title: book.book_title,
      author: book.book_author,
      description: book.book_description,
      shelf: book.book_shelf,
      copies: book.book_total_copies,
    });
  }

  protected updateForm() {
    if (this.bookForm?.value?.bookId) {
      const bookFromValues = this.bookForm.value;
      const bookPayload: Book = {
        book_title: bookFromValues.title || '',
        book_description: bookFromValues.description || '',
        book_author: bookFromValues.author || '',
        book_shelf: bookFromValues.shelf || '',
        book_total_copies: bookFromValues.copies || 0,
      };
      this.bookService
        .updateBook(this.bookForm.value.bookId, bookPayload)
        .pipe(
          tap((response: SingleBookResponse) => {
            if (response.success === true) {
              this.books.update((currentBooks) => {
                return currentBooks.map((book) => {
                  if (book.book_id === response.data!.book_id) {
                    return response.data!;
                  }
                  return book;
                });
              });
            }
          }),
          tap(() => {
            this.resetForm();
          }),
          finalize(() => {
            this.isEditModeEnabled.set(false);
          }),
        )
        .subscribe();
    }
  }

  protected cancelForm() {
    this.isEditModeEnabled.set(false);
    this.resetForm();
  }
}
