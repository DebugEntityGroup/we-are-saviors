import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { service } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sinscrire-admin',
  templateUrl: './sinscrire-admin.component.html',
  styleUrls: ['./sinscrire-admin.component.css']
})
export class SinscrireAdminComponent implements OnInit {

  estAuth: boolean;
  erreur: string;
  succes: string;
  constructor(private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
    public service: service,
    public router: Router) { }

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
    this.service.sinscrireAdmin().then(() => {
      if (form.value.id == null) {
        this.firestore.collection('admins').add(data);
        this.erreur = '';
        this.succes = 'Vous êtes inscrit en tant qu\'Administrateur\'';
      } else
        this.firestore.doc('admins').update(data);
        this.erreur = '';
        this.succes = 'Vous êtes inscrit en tant qu\'Administrateur\'';
        this.router.navigate(['/admin']);
    },
      (error) => {
        this.erreur = error;
        this.succes = '';
      });
  }

}
