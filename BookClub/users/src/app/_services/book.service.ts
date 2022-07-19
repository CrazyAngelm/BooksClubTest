import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';
import { BookRead } from '../models/bookRead.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl: string = `${environment.baseUrl}/Book`;

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  getAllBookReads(): Observable<BookRead[]> {
    return this.http.get<BookRead[]>(this.baseUrl + "/GetAllBookRead");
  }

  addBookRead(bookRead: BookRead): Observable<BookRead>
  {
    bookRead.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<BookRead>(this.baseUrl + "/addRead", bookRead);
  }

  deleteBookRead(userId: string, bookId: string): Observable<BookRead> {
    return this.http.delete<BookRead>(this.baseUrl + '/' + userId + "/" + bookId);
  }
}
