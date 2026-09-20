import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Book, BooksResponse } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly bookService = inject(BookService);

  public getAllBooks(): Observable<Book[]> {
    return this.bookService.getAllBooks().pipe(map((response) => response?.data?.booksArray ?? []));
  }

  public addNewBook(payload: Book): Observable<Book> {
    return this.bookService.addBook(payload).pipe(
      tap((response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
      }),
      map((response) => response?.data!),
    );
  }

  public updateBook(bookId: string, payload: Book): Observable<Book> {
    return this.bookService.updateBook(bookId, payload).pipe(
      tap((response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
      }),
      map((response) => response?.data!),
    );
  }

  public deleteBookById(bookId: string): Observable<BooksResponse> {
    return this.bookService.deleteBook(bookId).pipe(
      tap((response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
      }),
    );
  }
}
