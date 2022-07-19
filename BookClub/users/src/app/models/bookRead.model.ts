import { Book } from "./book.model";
import { User } from "./user.model";

export interface BookRead
{
    id: string;
    userId: string;
    user : User;
    bookId: string;
    book: Book;
}