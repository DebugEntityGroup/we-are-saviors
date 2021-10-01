import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { service } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  estAuth: boolean;
  estOuvert: boolean = false;
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
  seDeconnecterAdmin() {
    this.service.seDeconnecterAdmin().then(() => console.log('Admin Déconnecté'));
  }
  montrerMenu() {
    this.estOuvert =! this.estOuvert;
  }

}
