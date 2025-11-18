import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
  selector: 'book-list',
  imports: [CommonModule],
  template: `
    <div class="table-responsive">
      <table *ngIf="books && books.length > 0" class="table table-striped table-hover align-middle shadow-sm">
        <thead class="table-dark">
        <tr>
          <th scope="col">Titre</th>
          <th scope="col">Auteur</th>
          <th scope="col">Catégorie</th>
          <th scope="col">Disponible</th>
          <th scope="col" class="text-center">Actions</th>
        </tr>
        </thead>

        <tbody>
        <tr *ngFor="let book of books; trackBy: trackById">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.category }}</td>

          <td>
          <span
            class="badge"
            [class.bg-success]="book.isAvailable"
            [class.bg-secondary]="!book.isAvailable"
          >
            {{ book.isAvailable ? 'Oui' : 'Non' }}
          </span>
          </td>

          <td class="text-center">
            <button
              class="btn btn-sm btn-warning me-2"
              (click)="onEdit(book)"
            >
              Modifier
            </button>

            <button
              class="btn btn-sm btn-danger"
              (click)="onDelete(book.id)"
            >
              Supprimer
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div *ngIf="!books || books.length === 0" class="alert alert-info mt-3 text-center">
      Aucun livre pour le moment.
    </div>
  `
})
export class BookList {
  @Input() books: Book[] = [];
  @Output() edit = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<number>();

  trackById(index: number, item: Book) {
    return item.id;
  }

  onEdit(book: Book) {
    this.edit.emit(book);
  }

  onDelete(id: number | undefined) {
    if (id != null) this.delete.emit(id);
  }
}
