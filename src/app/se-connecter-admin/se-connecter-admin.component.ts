import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { service } from '../services/service.service';

@Component({
  selector: 'app-se-connecter-admin',
  templateUrl: './se-connecter-admin.component.html',
  styleUrls: ['./se-connecter-admin.component.css']
})
export class SeConnecterAdminComponent implements OnInit {

  estAuth: boolean;
  erreur: string;
  succes: string;
  constructor(private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
    public service: service) { }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.admin = {
      id: null,
      email: '',
      nom: '',
      prenom: '',
      motDePasse: '',
      confirmerMotDePasse: ''
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
    this.service.seConnecterAdmin().then(() => {
      if (form.value.id == null) {
        this.erreur = '';
        this.succes = "Bienvenue Admin!";
      }
    },
      (error) => {
        this.erreur = error;
        this.succes = '';
      }
    );
  }

}
