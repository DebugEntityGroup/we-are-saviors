import { Component, OnInit } from '@angular/core';
import { produit } from '../modèles/produit.model';
import { service } from '../services/service.service';
import { Subscription } from 'rxjs';
import { utilisateur } from '../modèles/utilisateur.model';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  produit: produit;
  produits: produit[];
  utilisateur: utilisateur;
  produitsObservable: Subscription;
  ajouter: number = -1;
  p: number = 1;
  succes: string;
  constructor(private service: service, public router: Router) { }

  ngOnInit() {
    this.produitsObservable = this.service.getProduits().subscribe(data => {
      this.produits = data.map(element => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        }
      })
    })
  }
  ngOnDestroy() {
    this.produitsObservable.unsubscribe()
  }
  ajouterAuPanier(index: number) {
    this.ajouter = +index;
  }
  acheter(quantite: number) {
    let produitselect = this.produits[this.ajouter]
    let data = {
      nomProduit: produitselect.nomProduit,
      quantite: +quantite,
      photoURL: produitselect.photoURL,
      description: produitselect.description,
      prix: produitselect.prix
    }
    this.service.ajouterAuPanier(data).then(() => this.ajouter = -1);
  }

}
