// Get Books Response

export interface BooksResponse {
  data?: BooksResponseWithPagination;
  message: string;
  success?: boolean;
}

export interface BooksResponseWithPagination {
  pageNumber: number;
  pageSize: number;
  pageTotal: number;
  booksArray: Book[];
}

// PUT, Delete, Post Response
export interface SingleBookResponse {
  data?: Book;
  message: string;
  success?: boolean;
}

// Common
export interface Book {
  book_id?: string;
  book_title: string;
  book_description: string;
  book_author: string;
  book_shelf: string;
  book_total_copies: number;
}
