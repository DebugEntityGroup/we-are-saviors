import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { service } from '../services/service.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.component.html',
  styleUrls: ['./bienvenue.component.css']
})
export class BienvenueComponent implements OnInit {

  estAuth: boolean;
  constructor(public router: Router,
    private service: service, private firebaseAuth: AngularFireAuth) { }

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
