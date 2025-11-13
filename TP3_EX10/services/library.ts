import { Book } from "../models/book";
import { Repository } from "./repository";

export class Library {
  constructor(private bookRepo: Repository<Book>) {}

  addBook(book: Book): void {
    this.bookRepo.add(book);
  }

  removeBook(id: number): void {
    this.bookRepo.remove(id);
  }

  searchBooks(keyword: string): Book[] {
    return this.bookRepo
      .getAll()
      .filter((b) => b.title.includes(keyword) || b.author.includes(keyword));
  }

  borrowBook(id: number): boolean {
    const book = this.bookRepo.find(id);
    if (book && book.available) {
      book.available = false;
      return true;
    }
    return false;
  }

  returnBook(id: number): boolean {
    const book = this.bookRepo.find(id);
    if (book && !book.available) {
      book.available = true;
      return true;
    }
    return false;
  }

  listBooks(): Book[] {
    return this.bookRepo.getAll();
  }
}
