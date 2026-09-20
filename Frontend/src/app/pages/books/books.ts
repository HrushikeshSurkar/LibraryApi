import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BooksService } from './books.service';
import { Navbar } from '../dashboard/components/navbar/navbar';

@Component({
  selector: 'app-books',
  imports: [ReactiveFormsModule, Navbar],
  templateUrl: './books.html',
  styleUrl: './books.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Books implements OnInit {
  private readonly bookService = inject(BooksService);

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
    this.initializeComponent();
  }

  private initializeComponent() {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books.set(books);
    });
  }

  protected saveForm() {
    const values = this.bookForm.value;

    const bookPayload: Book = {
      book_title: values.title || '',
      book_description: values.description || '',
      book_author: values.author || '',
      book_shelf: values.shelf || '',
      book_total_copies: values.copies || 0,
    };

    this.bookService.addNewBook(bookPayload).subscribe((book) => {
      this.books.update((currentBooks) => [...currentBooks, book]);
      this.resetForm();
    });
  }

  protected resetForm() {
    this.bookForm.reset();
  }

  protected onDeleteClick(bookId: string) {
    this.bookService.deleteBookById(bookId).subscribe(() => {
      this.books.update((currentBooks) => currentBooks.filter((book) => book.book_id !== bookId));
    });
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
    const bookId = this.bookForm.value.bookId;

    if (!bookId) return;

    const values = this.bookForm.value;

    const bookPayload: Book = {
      book_title: values.title || '',
      book_description: values.description || '',
      book_author: values.author || '',
      book_shelf: values.shelf || '',
      book_total_copies: values.copies || 0,
    };

    this.bookService.updateBook(bookId, bookPayload).subscribe((updatedBook) => {
      this.books.update((currentBooks) =>
        currentBooks.map((book) => (book.book_id === updatedBook.book_id ? updatedBook : book)),
      );

      this.resetForm();
      this.isEditModeEnabled.set(false);
    });
  }

  protected cancelForm() {
    this.isEditModeEnabled.set(false);
    this.resetForm();
  }
}
