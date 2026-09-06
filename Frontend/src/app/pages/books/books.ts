import { Component, inject, OnInit, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.html',
  styleUrl: './books.scss',
})
export class Books implements OnInit {
  private readonly bookService = inject(BookService);

  protected books = signal<Book[]>([]);
  public ngOnInit() {
    this.initilizeComponent();
  }

  private initilizeComponent() {
    const temp = this.bookService.getAllBooks();
    temp
      .pipe(
        tap((response) => {
          this.books.set(response.data || []);
        }),
      )
      .subscribe();
  }
}
