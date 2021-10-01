import { Component, OnInit } from '@angular/core';
import { service } from '../services/service.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {

  estAuth: boolean;
  constructor(private service: service, private firebaseAuth: AngularFireAuth) { }

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
  seDeconnecter() {
    this.service.seDeconnecter().then(() => console.log('Fournisseur Déconnecté'));
  }

}
