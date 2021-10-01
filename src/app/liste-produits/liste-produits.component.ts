import { Component, OnInit } from '@angular/core';
import { service } from '../services/service.service';
import { produit } from '../modèles/produit.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css']
})
export class ListeProduitsComponent implements OnInit {

  estAuth: boolean;
  produit: produit;
  produits: produit[];
  p: number = 1;
  constructor(private service: service, private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.service.getProduits().subscribe(
      actionArray => {
        this.produits = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as produit
        })
      }
    )
    this.firebaseAuth.auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.estAuth = true;
        } else {
          this.estAuth = false;
        }
      }
    );
  }

}
