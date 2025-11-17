import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BookList} from '../book-list/book-list';
import {BookForm} from '../book-form/book-form';
import {Book} from '../../models/book.model';

@Component({
  selector: 'book-container',
  standalone: true,
  imports: [CommonModule, FormsModule, BookList, BookForm],
  template: `
  <div class="container">
    <div class="header">
      <h1>Gestion des livres</h1>
      <div>
        <input class="search-input" placeholder="Recherche par titre/auteur" [(ngModel)]="query" />
        <select [(ngModel)]="sortBy">
          <option value="">-- Trier --</option>
          <option value="category">Catégorie</option>
          <option value="available">Disponibilité</option>
        </select>
        <span class="counter">Total: {{filteredBooks.length}}</span>
      </div>
    </div>

    <book-form
      [categories]="categories"
      [editBook]="editingBook"
      (create)="addBook($event)"
      (update)="updateBook($event)"
      (cancel)="cancelEdit()"
    ></book-form>

    <hr />

    <book-list [books]="filteredBooks" (edit)="startEdit($event)" (delete)="deleteBook($event)"></book-list>
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

  private nextId(): number {
    return this.books.length ? Math.max(...this.books.map(b => b.id)) + 1 : 1;
  }



  // Form state
  selectedBook: Book | null = null;
  isEditMode = false;

  // filtrage / tri utils
  protected editingBook: Book = {
    author: '',
    category: '',
    id: 0,
    isAvailable: false,
    publisherEmail: '',
    releaseDate: '',
    title: ''
  };
  protected query: any;
  get filteredBooks(): Book[] {
    let list = this.books.slice();
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

  get totalCount(): number {
    return this.books.length;
  }

  onCancelEdit() {
    this.isEditMode = false;
    this.selectedBook = null;
  }

  protected startEdit($event: Book) {

  }

  protected addBook($event: Book) {

  }

  protected updateBook($event: Book) {

  }

  protected cancelEdit() {

  }

  protected deleteBook($event: number) {

  }

  onAddBook(book: Omit<Book, 'id'>) {
    const newBook: Book = { ...book, id: this.nextId() };
    this.books.push(newBook);
  }

  onDeleteBook(id: number) {
    this.books = this.books.filter(b => b.id !== id);
  }

  onEditRequest(book: Book) {
    this.selectedBook = { ...book };
    this.isEditMode = true;
  }

  onUpdateBook(updated: Book) {
    const idx = this.books.findIndex(b => b.id === updated.id);
    if (idx !== -1) this.books[idx] = { ...updated };
    this.isEditMode = false;
    this.selectedBook = null;
  }
}

