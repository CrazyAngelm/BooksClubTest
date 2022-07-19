import { Component } from '@angular/core';
import { first } from 'rxjs';
import { Book } from '../models/book.model';
import { BookRead } from '../models/bookRead.model';
import { User } from '../models/user.model';
import { AuthenticationService } from '../_services/authentication.service';
import { BookService } from '../_services/book.service';
import { UserService } from '../_services/user.service';

@Component({
  templateUrl: './bookread.component.html',
  styleUrls: ['../app.component.css']
})
export class BookReadComponent {
  searchText = '';
  books: Book[] = [];
  bookreads: BookRead[] = [];

  loading = false;
  user: User | null;
  userFromApi: User = {
    id: '',
    login: '',
    password: '',
  };

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private bookService: BookService
  ) {
    this.user = this.authenticationService.user;
    this.getAllBooks();
  }

  ngOnInit() {
    this.loading = true;
    if (this.user) {
      this.userService
        .getUserById(this.user.id)
        .pipe(first())
        .subscribe((user) => {
          this.loading = false;
          this.userFromApi = user;
        });
    }
  }

  deleteBookRead(bookId: string)
  {
    if(this.user!== null)
    {
      this.bookService.deleteBookRead(this.user.id, bookId).subscribe((response) => {
        this.getAllBooks();
      });
    }
  }

  getAllBooks() {
    this.bookService.getAllBookReads().subscribe((responce) => {
      this.bookreads = responce;
      this.bookService.getAllBooks().subscribe((responce) => {
        this.books = responce;
        this.books = this.books.filter(x => this.bookreads.find(y => y.bookId === x.id));
      });
    });
  }
}
