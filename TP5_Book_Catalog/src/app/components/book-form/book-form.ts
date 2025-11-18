import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Book } from '../../models/book.model';

@Component({
  selector: 'book-form',
  imports: [CommonModule, FormsModule, NgIf, NgForOf],
  template: `
    <form #bookForm="ngForm" (ngSubmit)="onSubmit(bookForm)" class="p-3 border rounded bg-light">
      <fieldset>
        <!-- Titre -->
        <div class="mb-3">
          <label for="title" class="form-label">Titre</label>
          <input id="title" name="title" class="form-control"
                 [(ngModel)]="model.title" #titleRef="ngModel"
                 required minlength="3" pattern=".*[A-Za-z].*"
                 [ngClass]="{'is-invalid': titleRef.invalid && titleRef.dirty}" />

          <div class="invalid-feedback" *ngIf="titleRef.invalid && titleRef.dirty">
            <div *ngIf="titleRef.errors?.['required']">Le titre est requis.</div>
            <div *ngIf="titleRef.errors?.['minlength']">Au moins 3 caractères.</div>
            <div *ngIf="titleRef.errors?.['pattern']">Le titre ne doit pas être uniquement des chiffres.</div>
          </div>
        </div>

        <!-- Auteur -->
        <div class="mb-3">
          <label for="author" class="form-label">Auteur</label>
          <input id="author" name="author" class="form-control"
                 [(ngModel)]="model.author" #authorRef="ngModel"
                 required minlength="3"
                 [ngClass]="{'is-invalid': authorRef.invalid && authorRef.dirty}" />

          <div class="invalid-feedback" *ngIf="authorRef.invalid && authorRef.dirty">
            <div *ngIf="authorRef.errors?.['required']">L'auteur est requis.</div>
            <div *ngIf="authorRef.errors?.['minlength']">Au moins 3 caractères.</div>
          </div>
        </div>

        <!-- Email éditeur -->
        <div class="mb-3">
          <label for="publisherEmail" class="form-label">Email Éditeur</label>
          <input id="publisherEmail" name="publisherEmail" type="email"
                 class="form-control"
                 [(ngModel)]="model.publisherEmail" #emailRef="ngModel" required
                 [ngClass]="{'is-invalid': emailRef.invalid && emailRef.dirty}" />

          <div class="invalid-feedback" *ngIf="emailRef.invalid && emailRef.dirty">
            <div *ngIf="emailRef.errors?.['required']">L'email est requis.</div>
            <div *ngIf="emailRef.errors?.['email']">Email invalide.</div>
          </div>
        </div>

        <!-- Téléphone -->
        <div class="mb-3">
          <label for="publisherPhone" class="form-label">Téléphone (Tunisie)</label>
          <input id="publisherPhone" name="publisherPhone" class="form-control"
                 type="text"
                 [(ngModel)]="model.publisherPhone" #phoneRef="ngModel"
                 pattern="^[0-9]{8}$"
                 [ngClass]="{'is-invalid': phoneRef.invalid && phoneRef.dirty}" />

          <div class="invalid-feedback" *ngIf="phoneRef.invalid && phoneRef.dirty">
            <div *ngIf="phoneRef.errors?.['pattern']">Doit être exactement 8 chiffres.</div>
          </div>
        </div>

        <!-- Date -->
        <div class="mb-3">
          <label for="releaseDate" class="form-label">Date de sortie</label>
          <input id="releaseDate" name="releaseDate" type="date"
                 class="form-control"
                 [(ngModel)]="model.releaseDate" #dateRef="ngModel"
                 required (ngModelChange)="checkYear()"
                 [ngClass]="{'is-invalid': (dateRef.invalid && dateRef.dirty) || releaseYearInvalid}" />

          <div class="invalid-feedback" *ngIf="dateRef.invalid && dateRef.dirty">
            La date est requise.
          </div>

          <div class="text-danger small mt-1" *ngIf="releaseYearInvalid">
            Année doit être supérieure à 1900.
          </div>
        </div>

        <!-- Catégorie -->
        <div class="mb-3">
          <label for="category" class="form-label">Catégorie</label>
          <select id="category" name="category" class="form-select"
                  [(ngModel)]="model.category" #catRef="ngModel" required
                  [ngClass]="{'is-invalid': catRef.invalid && catRef.dirty}">
            <option value="">-- Choisir --</option>
            <option *ngFor="let c of categories" [value]="c">{{ c }}</option>
          </select>

          <div class="invalid-feedback" *ngIf="catRef.invalid && catRef.dirty">
            La catégorie est requise.
          </div>
        </div>

        <!-- Disponible -->
        <div class="form-check mb-3">
          <input type="checkbox" id="isAvailable" name="isAvailable"
                 class="form-check-input"
                 [(ngModel)]="model.isAvailable" />
          <label for="isAvailable" class="form-check-label">Disponible</label>
        </div>

        <!-- Stock -->
        <div class="mb-3">
          <label for="stock" class="form-label">Stock</label>
          <input id="stock" name="stock" type="number"
                 class="form-control"
                 [(ngModel)]="model.stock" #stockRef="ngModel" min="0"
                 [ngClass]="{'is-invalid': stockRef.invalid && stockRef.dirty}" />

          <div class="invalid-feedback" *ngIf="stockRef.invalid && stockRef.dirty">
            <div *ngIf="stockRef.errors?.['min']">Stock doit être ≥ 0.</div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="mt-3">
          <button type="submit" class="btn btn-primary me-2"
                  [disabled]="!bookForm.form.valid || releaseYearInvalid">
            {{ isEdit ? 'Mettre à jour' : 'Ajouter' }}
          </button>

          <button type="button" class="btn btn-secondary" (click)="reset(bookForm)">
            Annuler
          </button>
        </div>

      </fieldset>
    </form>
  `
})
export class BookForm implements OnChanges {
  @Input() categories: string[] = [];
  @Input() editBook: Book | null = null;
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
