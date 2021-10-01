import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { produit } from '../modèles/produit.model';
import { service } from '../services/service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.css']
})
export class ModifierProduitComponent implements OnInit {

  categories: string[] = ['Informatique', 'Smartphones', 'Mode', 'Jeux Vidéos', 'Santé et Beauté', 'Accessoires', 'Sport'];
  succes: string;
  estAuth: boolean;
  @ViewChild('image') image: ElementRef
  constructor(private service: service, private router: Router, 
    private firestore: AngularFirestore, private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
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
  modifierProduit(form: NgForm) {
    let data = Object.assign({}, form.value);
    this.firestore.doc('produits/' + form.value.id).update(data);
    let nomProduit = (<produit>form.value).nomProduit,
      prix = (<produit>form.value).prix,
      description = (<produit>form.value).description,
      categorie = (<produit>form.value).categorie,
      image = (<HTMLInputElement>this.image.nativeElement).files[0];
      this.service.modifierProduit(nomProduit, prix, description, categorie, image);
      this.succes = "Produit modifié avec succées!";
  }

}
