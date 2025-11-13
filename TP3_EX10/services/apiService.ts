import { Book } from "../models/book";

// Service API fictif
export class ApiService {
  async fetchBooks(): Promise<Book[]> {
    // Simulation d'un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "1984",
            author: "George Orwell",
            year: 1949,
            available: true,
          },
          {
            id: 2,
            title: "Brave New World",
            author: "Aldous Huxley",
            year: 1932,
            available: true,
          },
          {
            id: 3,
            title: "Fahrenheit 451",
            author: "Ray Bradbury",
            year: 1953,
            available: true,
          },
        ]);
      }, 500);
    });
  }
}
