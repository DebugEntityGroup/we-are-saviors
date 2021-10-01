import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-pied-de-page',
  templateUrl: './pied-de-page.component.html',
  styleUrls: ['./pied-de-page.component.css']
})
export class PiedDePageComponent implements OnInit {

  estAuth: boolean;
  constructor(private firebaseAuth: AngularFireAuth) { }

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
