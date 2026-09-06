import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book, BooksResponse } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public getAllBooks(): Observable<BooksResponse> {
    return this.httpClient.get<BooksResponse>(`${this.apiUrl}/books`);
  }

  public addBook(payload: Book): Observable<BooksResponse> {
    return this.httpClient.post<BooksResponse>(`${this.apiUrl}/books`, payload);
  }

  public updateBook(id: string, payload: Book): Observable<BooksResponse> {
    return this.httpClient.put<BooksResponse>(`${this.apiUrl}/books/${id}`, payload);
  }
  public deleteBook(id: string): Observable<BooksResponse> {
    return this.httpClient.delete<BooksResponse>(`${this.apiUrl}/books/${id}`);
  }
}
