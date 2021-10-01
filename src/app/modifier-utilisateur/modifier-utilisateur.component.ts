import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { service } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.css']
})
export class ModifierUtilisateurComponent implements OnInit {

  estAuth: boolean;
  erreur: string;
  succes: string;
  roles: string[] = ['Client', 'Fournisseur'];
  constructor(private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
    public service: service,
    public router: Router) { }

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
  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
      this.firestore.doc('utilisateurs/'+form.value.id).update(data);
      this.erreur = '';
      this.succes = 'Utilisateur Modifié avec succés!';
    (error) => {
      this.erreur = error;
      this.succes = '';
    }
  }

}
