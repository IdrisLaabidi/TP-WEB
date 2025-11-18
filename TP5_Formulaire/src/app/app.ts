import { Component, signal } from '@angular/core';
import {FormulaireInscription} from './formulaire-inscription/formulaire-inscription';

@Component({
  selector: 'app-root',
  imports: [FormulaireInscription],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('TP5_Formulaire');
}
