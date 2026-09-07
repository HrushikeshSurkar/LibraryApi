import { Component, inject, OnInit, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books',
  imports: [], // TODO: Add ReactiveFormsModule
  templateUrl: './books.html',
  styleUrl: './books.scss',
})
export class Books implements OnInit {
  private readonly bookService = inject(BookService);

  protected books = signal<Book[]>([]);

  // TODO: Inject FormBuilder
  // TODO: Create public bookForm group with required validations

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

  public saveForm() {
    // TODO: console.log the form value
  }
}
