import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Book } from '../../models/book.model';

@Component({
  selector: 'book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgForOf],
  template: `
  <form #bookForm="ngForm" (ngSubmit)="onSubmit(bookForm)">
    <fieldset>
      <label for="title">Titre</label>
      <input id="title" name="title" [(ngModel)]="model.title" #titleRef="ngModel"
             required minlength="3" pattern=".*[A-Za-z].*" />
      <div *ngIf="titleRef.invalid && titleRef.dirty">
        <small *ngIf="titleRef.errors?.['required']">Le titre est requis.</small>
        <small *ngIf="titleRef.errors?.['minlength']">Au moins 3 caractères.</small>
        <small *ngIf="titleRef.errors?.['pattern']">Le titre ne doit pas être uniquement des chiffres.</small>
      </div>

      <label for="author">Auteur</label>
      <input id="author" name="author" [(ngModel)]="model.author" #authorRef="ngModel"
             required minlength="3" />
      <div *ngIf="authorRef.invalid && authorRef.dirty">
        <small *ngIf="authorRef.errors?.['required']">L'auteur est requis.</small>
        <small *ngIf="authorRef.errors?.['minlength']">Au moins 3 caractères.</small>
      </div>

      <label for="publisherEmail">Email Editeur</label>
      <input id="publisherEmail" name="publisherEmail" type="email" [(ngModel)]="model.publisherEmail"
             #emailRef="ngModel" required />
      <div *ngIf="emailRef.invalid && emailRef.dirty">
        <small *ngIf="emailRef.errors?.['required']">L'email est requis.</small>
        <small *ngIf="emailRef.errors?.['email']">Email invalide.</small>
      </div>

      <label for="publisherPhone">Téléphone (tunisie)</label>
      <input id="publisherPhone" name="publisherPhone" type="text" [(ngModel)]="model.publisherPhone"
             #phoneRef="ngModel" pattern="^[0-9]{8}$" />
      <div *ngIf="phoneRef.invalid && phoneRef.dirty">
        <small *ngIf="phoneRef.errors?.['pattern']">Doit être exactement 8 chiffres.</small>
      </div>

      <label for="releaseDate">Date de sortie</label>
      <input id="releaseDate" name="releaseDate" type="date" [(ngModel)]="model.releaseDate"
             #dateRef="ngModel" required (ngModelChange)="checkYear()" />
      <div *ngIf="dateRef.invalid && dateRef.dirty">
        <small *ngIf="dateRef.errors?.['required']">La date est requise.</small>
      </div>
      <div *ngIf="releaseYearInvalid">
        <small>Année doit être supérieure à 1900.</small>
      </div>

      <label for="category">Catégorie</label>
      <select id="category" name="category" [(ngModel)]="model.category" #catRef="ngModel" required>
        <option value="">-- Choisir --</option>
        <option *ngFor="let c of categories" [value]="c">{{c}}</option>
      </select>
      <div *ngIf="catRef.invalid && catRef.dirty">
        <small>La catégorie est requise.</small>
      </div>

      <label>
        <input type="checkbox" name="isAvailable" [(ngModel)]="model.isAvailable" /> Disponible
      </label>

      <label for="stock">Stock</label>
      <input id="stock" name="stock" type="number" [(ngModel)]="model.stock" #stockRef="ngModel" min="0" />
      <div *ngIf="stockRef.invalid && stockRef.dirty">
        <small *ngIf="stockRef.errors?.['min']">Stock doit être >= 0.</small>
      </div>

      <div style="margin-top:12px;">
        <button type="submit" [disabled]="!bookForm.form.valid || releaseYearInvalid">{{isEdit ? 'Mettre à jour' : 'Ajouter'}}</button>
        <button type="button" (click)="reset(bookForm)">Annuler</button>
      </div>
    </fieldset>
  </form>
  `
})
export class BookForm implements OnChanges {
  @Input() categories: string[] = [];
  @Input() editBook: Book | null = null; // si non null -> mode édition
  @Output() create = new EventEmitter<Book>();
  @Output() update = new EventEmitter<Book>();
  @Output() cancel = new EventEmitter<void>();

  model: Book = this.emptyBook();
  isEdit = false;
  releaseYearInvalid = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editBook'] && this.editBook) {
      this.model = { ...this.editBook };
      this.isEdit = true;
      this.checkYear();
    }
    if (changes['editBook'] && this.editBook === null) {
      this.isEdit = false;
      this.model = this.emptyBook();
      this.releaseYearInvalid = false;
    }
  }

  emptyBook(): Book {
    return {
      id: 0,
      title: '',
      author: '',
      publisherEmail: '',
      publisherPhone: undefined,
      releaseDate: '',
      category: '',
      isAvailable: false,
      stock: undefined,
    };
  }

  checkYear() {
    if (!this.model.releaseDate) {
      this.releaseYearInvalid = false;
      return;
    }
    const year = new Date(this.model.releaseDate).getFullYear();
    this.releaseYearInvalid = !(year > 1900);
  }

  onSubmit(form: NgForm) {
    if (this.isEdit) {
      this.update.emit({ ...this.model });
    } else {
      this.create.emit({ ...this.model });
    }
    this.reset(form);
  }

  reset(form?: NgForm) {
    form?.resetForm();
    this.model = this.emptyBook();
    this.isEdit = false;
    this.releaseYearInvalid = false;
    this.cancel.emit();
  }
}
