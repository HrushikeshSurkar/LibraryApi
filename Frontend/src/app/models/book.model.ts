export interface Book {
  book_id?: string;
  book_title: string;
  book_description: string;
  book_author: string;
  book_shelf: string;
  book_total_copies: number;
}

export interface BooksResponse {
  data?: Book[];
  message: string;
}

export interface SingleBookResponse {
  data?: Book;
  message: string;
}
