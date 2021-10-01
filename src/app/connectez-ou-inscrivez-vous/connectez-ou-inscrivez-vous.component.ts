import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connectez-ou-inscrivez-vous',
  templateUrl: './connectez-ou-inscrivez-vous.component.html',
  styleUrls: ['./connectez-ou-inscrivez-vous.component.css']
})
export class ConnectezOuInscrivezVousComponent implements OnInit {

  estAuth: boolean;
  constructor(private firebaseAuth: AngularFireAuth, public router: Router) { }

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

}
