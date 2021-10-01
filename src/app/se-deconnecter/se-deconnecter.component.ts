import { Component, OnInit } from '@angular/core';
import { service } from '../services/service.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-se-deconnecter',
  templateUrl: './se-deconnecter.component.html',
  styleUrls: ['./se-deconnecter.component.css']
})
export class SeDeconnecterComponent implements OnInit {

  estAuth: boolean;
  constructor(private firebaseAuth: AngularFireAuth,
    public router: Router,
    public service: service) { }

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
  deconnexion() {
    this.service.seDeconnecter();
  }

}
