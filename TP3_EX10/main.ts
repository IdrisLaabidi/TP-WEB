import { Book } from "./models/book";
import { User, Admin } from "./models/person";
import { Repository } from "./services/repository";
import { Library } from "./services/library";
import { ApiService } from "./services/apiService";
import { log } from "./utils/logger";

async function main() {
  const bookRepo = new Repository<Book>();
  const library = new Library(bookRepo);

  const api = new ApiService();
  const books = await api.fetchBooks();
  console.log(books);

  // Ajouter les livres du service API
  books.forEach((book) => library.addBook(book));

  log("Liste des livres initiale:");
  console.log(library.listBooks());

  const user = new User(1, "Alice");
  const admin = new Admin(2, "Bob");

  // Emprunter un livre
  if (library.borrowBook(1)) {
    log(`${user.name} a emprunté le livre 1`);
  }

  // Retourner un livre
  if (library.returnBook(1)) {
    log(`${user.name} a rendu le livre 1`);
  }

  // Rechercher un livre
  const searchResults = library.searchBooks("1984");
  log("Résultat de recherche:");
  console.log(searchResults);
}

main();
