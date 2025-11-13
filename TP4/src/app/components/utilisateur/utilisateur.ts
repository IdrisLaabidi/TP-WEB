import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-utilisateur',
  imports: [FormsModule],
  templateUrl: './utilisateur.html',
  styleUrl: './utilisateur.scss'
})
export class Utilisateur {
  protected name : string = ""
}
