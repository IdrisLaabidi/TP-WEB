import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-produit',
  imports: [CurrencyPipe],
  templateUrl: './produit.html',
  styleUrl: './produit.scss',
})
export class Produit {
  protected readonly imageUrl: string = 'favicon.ico';
  protected enStock : boolean = true;
  @Output() ajouterAuPanier: EventEmitter<string> = new EventEmitter();
  @Input() nomProduit: string = '';
  protected readonly prix : number = 10;

  afficherAlerte() : void {

    this.ajouterAuPanier.emit(this.nomProduit)
  }
}
