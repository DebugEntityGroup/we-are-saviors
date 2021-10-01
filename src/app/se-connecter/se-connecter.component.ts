import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { service } from '../services/service.service';

@Component({
  selector: 'app-se-connecter',
  templateUrl: './se-connecter.component.html',
  styleUrls: ['./se-connecter.component.css']
})
export class SeConnecterComponent implements OnInit {

  estAuth: boolean;
  erreur: string;
  succes: string;
  constructor(private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
    public service: service) { }

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
    this.service.seConnecter().then(() => {
      if (form.value.id == null) {
        this.erreur = '';
        this.succes = "Vous êtes connecté avec succèes!";
      }
    },
      (error) => {
        this.erreur = error;
        this.succes = '';
      }
    );
  }

}
