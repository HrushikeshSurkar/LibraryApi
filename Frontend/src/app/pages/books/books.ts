import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
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

  protected bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    shelf: new FormControl('', Validators.required),
    copies: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
  });

  protected books = signal<Book[]>([]);

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
}
