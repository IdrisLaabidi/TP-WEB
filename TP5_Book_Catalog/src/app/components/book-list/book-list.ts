import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table *ngIf="books && books.length > 0">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Auteur</th>
          <th>Catégorie</th>
          <th>Disponible</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let book of books; trackBy: trackById">
          <td>{{book.title}}</td>
          <td>{{book.author}}</td>
          <td>{{book.category}}</td>
          <td>{{book.isAvailable ? 'Oui' : 'Non'}}</td>
          <td class="actions">
            <button (click)="onEdit(book)">Modifier</button>
            <button (click)="onDelete(book.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div *ngIf="!books || books.length === 0">
      Aucun livre.
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
