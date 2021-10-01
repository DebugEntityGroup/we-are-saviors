import { Component, OnInit } from '@angular/core';
import { service } from '../services/service.service';
import { panier } from '../modèles/panier.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  estAuth: boolean;
  paniers: panier[];
  constructor(public service: service, private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.service.getPanier().subscribe(paniers => {
      this.paniers = paniers.map(panier => {
        return {
          id: panier.payload.doc.id,
          ...panier.payload.doc.data()
        }
      })
    })
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
  supprimerDuPanier(index) {
    this.service.supprimer(this.paniers[index].id);
  }

}
