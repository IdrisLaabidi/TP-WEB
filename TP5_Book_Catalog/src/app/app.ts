import { Component, signal } from '@angular/core';
import {BookContainerComponent} from './components/book-container/book-container';

@Component({
  selector: 'app-root',
  imports: [BookContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('TP5_Book_Catalog');
}
