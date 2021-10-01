import { Component, OnInit } from '@angular/core';
import { service } from '../services/service.service';
import { utilisateur } from '../modèles/utilisateur.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-utilisateurs.component.html',
  styleUrls: ['./liste-utilisateurs.component.css']
})
export class ListeUtilisateursComponent implements OnInit {

  estAuth: boolean;
  p: number = 1;
  utilisateur: utilisateur;
  utilisateurs: utilisateur[];
  constructor(private service: service, private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.service.getUtilisateurs().subscribe(
      actionArray => {
        this.utilisateurs = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as utilisateur
        })
      }
    )
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
