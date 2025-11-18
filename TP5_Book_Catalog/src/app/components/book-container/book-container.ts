import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BookList} from '../book-list/book-list';
import {BookForm} from '../book-form/book-form';
import {Book} from '../../models/book.model';

@Component({
  selector: 'book-container',
  imports: [CommonModule, FormsModule, BookList, BookForm],
  template: `
    <div class="container py-4">

      <!-- HEADER -->
      <div class="card mb-4 shadow-sm">
        <div class="card-body">

          <div class="d-flex justify-content-between align-items-center flex-wrap">
            <h2 class="mb-3 mb-md-0">📚 Gestion des livres</h2>

            <div class="d-flex gap-2 align-items-center flex-wrap">
              <input
                class="form-control"
                style="min-width: 220px"
                placeholder="Recherche..."
                [(ngModel)]="searchText"
              />

              <select class="form-select" [(ngModel)]="sortBy" style="min-width: 160px">
                <option value="">-- Trier --</option>
                <option value="category">Catégorie</option>
                <option value="availability">Disponibilité</option>
              </select>

              <span class="badge bg-primary fs-6">Total : {{ filteredBooks.length }}</span>
            </div>
          </div>

        </div>
      </div>

      <!-- FORMULAIRE -->
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <book-form
            [categories]="categories"
            [editBook]="editingBook"
            (create)="addBook($event)"
            (update)="updateBook($event)"
            (cancel)="cancelEdit()"
          ></book-form>
        </div>
      </div>

      <!-- LISTE -->
      <book-list
        [books]="filteredBooks"
        (edit)="startEdit($event)"
        (delete)="deleteBook($event)"
      ></book-list>

    </div>
  `
})
export class BookContainerComponent {
  books: Book[] = [
    {
      id: 1,
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      publisherEmail: 'editions@pp.com',
      publisherPhone: '12345678',
      releaseDate: '1943-04-06',
      category: 'Roman',
      isAvailable: true,
      stock: 10
    },
    {
      id: 2,
      title: 'Introduction à TypeScript',
      author: 'Jean Dupont',
      publisherEmail: 'contact@editeurtech.tn',
      publisherPhone: '98765432',
      releaseDate: '2020-01-15',
      category: 'Informatique',
      isAvailable: true,
      stock: 5
    }
  ];

  categories = ['Roman', 'Science', 'Histoire', 'Informatique', 'Art', 'Autres'];

  searchText = '';
  sortBy: 'category' | 'availability' | '' = '';

  editingBook: Book | null = null;

  private nextId(): number {
    return this.books.length ? Math.max(...this.books.map(b => b.id)) + 1 : 1;
  }

  // --- FILTRAGE + TRI ---
  get filteredBooks(): Book[] {
    let list = [...this.books];

    if (this.searchText) {
      const q = this.searchText.toLowerCase();
      list = list.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    }

    if (this.sortBy === 'category') {
      list.sort((a, b) => a.category.localeCompare(b.category));
    } else if (this.sortBy === 'availability') {
      list.sort((a, b) => Number(b.isAvailable) - Number(a.isAvailable));
    }

    return list;
  }

  // --- CRUD LOGIC ---
  startEdit(book: Book) {
    this.editingBook = { ...book };
  }

  addBook(book: Book) {
    const newBook = { ...book, id: this.nextId() };
    this.books.push(newBook);
  }

  updateBook(updated: Book) {
    const index = this.books.findIndex(b => b.id === updated.id);
    if (index !== -1) this.books[index] = { ...updated };
    this.editingBook = null;
  }

  cancelEdit() {
    this.editingBook = null;
  }

  deleteBook(id: number) {
    this.books = this.books.filter(b => b.id !== id);
  }
}

