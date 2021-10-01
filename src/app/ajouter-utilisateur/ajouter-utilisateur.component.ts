import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { service } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.css']
})
export class AjouterUtilisateurComponent implements OnInit {

  estAuth: boolean;
  erreur: string;
  succes: string;
  roles: string[] = ['Client', 'Fournisseur'];
  constructor(private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
    private service: service,
    public router: Router) { }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.utilisateur = {
      id: null,
      nom: '',
      prenom: '',
      email: '',
      motDePasse: '',
      confirmerMotDePasse: '',
      role: '',
      tel: null
    }
  }
  ngOnInit() {
    this.resetForm();
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
    delete data.id;
      if (form.value.id == null) {
        this.firestore.collection('utilisateurs').add(data);
        this.erreur = '';
        this.succes = this.service.utilisateur.role+' ajouté avec succés!';
      } else
        this.firestore.doc('utilisateurs').update(data);
        this.erreur = '';
        this.succes = this.service.utilisateur.role+' ajouté avec succés!';
      (error) => {
        this.erreur = error;
        this.succes = '';
      }
  }

}
