import { Component } from '@angular/core';
import { first } from 'rxjs';
import { Book } from '../models/book.model';
import { BookRead } from '../models/bookRead.model';
import { User } from '../models/user.model';
import { AuthenticationService } from '../_services/authentication.service';
import { BookService } from '../_services/book.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'home-app',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css']
})
export class HomeComponent {
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

  isBookRead(bookId: string)
  {
    if(this.user !== null && this.bookreads.find(x => x.bookId === bookId && x.userId == this.user?.id))
    {
      return true;
    }
    return false;
  }

  addBookRead(bookId: string)
  {
    if(this.user !== null)
    {
      const bookRead: BookRead = {
        id: '',
        userId: this.user.id,
        user: this.user,
        bookId: bookId,
        book: this.books.find((book) => book.id == bookId) as Book
      };
  
      this.bookService.addBookRead(bookRead).subscribe((response) => {
        this.getAllBooks();
    }, (error) =>
    {
        throw error;
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
    this.bookService.getAllBooks().subscribe((responce) => {
      this.books = responce;
    });
    this.bookService.getAllBookReads().subscribe((responce) => {
      this.bookreads = responce;
    });
  }
}
