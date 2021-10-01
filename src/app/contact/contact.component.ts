import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { service } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  erreur: string;
  succes: string;
  roles: string[] = ['Client', 'Fournisseur'];
  constructor(private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth,
    public service: service,
    public router: Router) { }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.message = {
      id: null,
      email: '',
      role: '',
      sujet: '',
      message: ''
    }
  }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
      if (form.value.id == null) {
        this.firestore.collection('messages').add(data);
        this.erreur = '';
        this.succes = 'Votre message a été envoyé avec succès!';
      } else
        this.firestore.doc('messages').update(data);
      this.erreur = '';
      this.succes = 'Votre message a été envoyé avec succès!';
      (error) => {
        this.erreur = error;
        this.succes = '';
      };
  }

}
