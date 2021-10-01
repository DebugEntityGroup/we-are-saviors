import { Component, OnInit } from '@angular/core';
import { service } from '../services/service.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

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
    this.service.seDeconnecter().then(() => console.log('Client Déconnecté'));
  }

}
