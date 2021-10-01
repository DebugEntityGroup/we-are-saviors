import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { produit } from '../modèles/produit.model';
import { service } from '../services/service.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent implements OnInit {

  categories: string[] = ['Informatique', 'Smartphones', 'Mode', 'Jeux Vidéos', 'Santé et Beauté', 'Sport'];
  succes: string;
  estAuth: boolean;
  @ViewChild('image') image: ElementRef

  constructor(private service: service, private router: Router,
    private firebaseAuth: AngularFireAuth) { }

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
  ajouterProduit(form: NgForm) {
    let nomProduit = (<produit>form.value).nomProduit,
        prix = (<produit>form.value).prix,
        description = (<produit>form.value).description,
        categorie = (<produit>form.value).categorie,
        image = (<HTMLInputElement>this.image.nativeElement).files[0];
        this.service.ajouterProduit(nomProduit, prix, description, categorie, image),
        this.succes = "Produit ajouté avec succées!";  
  }

}
