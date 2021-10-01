import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { utilisateur } from '../modèles/utilisateur.model';
import { Observable } from 'rxjs';
import { admin } from '../modèles/admin.model';
import { produit } from '../modèles/produit.model';
import { panier } from '../modèles/panier.model';
import { message } from '../modèles/message.model';

@Injectable({
    providedIn: 'root'
})

export class service {
    utilisateur: utilisateur;
    message: message;
    admin: admin;
    produit: produit;
    panier: panier;
    id: string;
    utilisateurF: Observable<firebase.User>
    constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore,
        private storage: AngularFireStorage) {
        this.firebaseAuth.authState.subscribe(user => {
            if (user) {
                user;
                localStorage.setItem('user', JSON.stringify(this.utilisateurF));
            } else {
                localStorage.setItem('user', null);
            }
        })
    }

    sinscrire() {
        return new Promise(
            (resolve, reject) => {
                this.firebaseAuth.auth.createUserWithEmailAndPassword
                    (this.utilisateur.email, this.utilisateur.motDePasse).then(
                        (result) => {
                            resolve(result);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        );
    }
    sinscrireAdmin() {
        return new Promise(
            (resolve, reject) => {
                this.firebaseAuth.auth.createUserWithEmailAndPassword
                    (this.admin.email, this.admin.motDePasse).then(
                        (result) => {
                            resolve(result);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        );
    }
    seConnecter() {
        return new Promise(
            (resolve, reject) => {
                this.firebaseAuth.auth.signInWithEmailAndPassword
                    (this.utilisateur.email, this.utilisateur.motDePasse).then(
                        (result) => {
                            resolve(result);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        );
    }
    seConnecterAdmin() {
        return new Promise(
            (resolve, reject) => {
                this.firebaseAuth.auth.signInWithEmailAndPassword
                    (this.admin.email, this.admin.motDePasse).then(
                        (result) => {
                            resolve(result);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        );
    }
    seDeconnecter() {
        return this.firebaseAuth.auth.signOut();
    }
    seDeconnecterAdmin() {
        return this.firebaseAuth.auth.signOut();
    }
    ajouterProduit(nomProduit: string, prix: Number, description: string, categorie: string, image: File) {
        let ref = this.storage.ref('produits/' + image.name)
        ref.put(image).then(() => {
            ref.getDownloadURL().subscribe(photoURL => {
                this.firestore.collection('produits').add({
                    nomProduit,
                    prix,
                    description,
                    categorie,
                    photoURL
                })
            })
        })
    }
    modifierProduit(nomProduit: string, prix: Number, description: string, categorie: string, image: File) {
        let ref = this.storage.ref('produits/' + image.name)
        ref.put(image).then(() => {
            ref.getDownloadURL().subscribe(photoURL => {
                this.firestore.doc('produits/'+this.produit.id).update({
                    nomProduit,
                    prix,
                    description,
                    categorie,
                    photoURL
                })
            })
        })
    }
    modifierUtilisateur(utilisateur: utilisateur) {
        this.utilisateur = Object.assign({}, utilisateur);
    }
    modifierLeProduit(produit: produit) {
        this.produit = Object.assign({}, produit);
    }
    supprimerUtilisateur(id: string) {
        if(confirm("Confirmer la Suppression?")) {
            this.firestore.doc('utilisateurs/' +id).delete();
        }
    }
    supprimerProduit(id: string) {
        if (confirm("Confirmer la Suppression?")) {
            this.firestore.doc('produits/' + id).delete();       
        }
    }
    supprimer(id: string) {
        if (confirm("Confirmer la Suppression?")) {
        this.firestore.doc('panier/'+id).delete();
        }
    }
    ajouterAuPanier(data: produit) {
        return this.firestore.collection('panier').add(data);
    }
    getProduits() {
        return this.firestore.collection('produits').snapshotChanges();
    }
    getUtilisateurs() {
        return this.firestore.collection('utilisateurs').snapshotChanges();
    }
    getPanier() {
        return this.firestore.collection('panier').snapshotChanges();
    }
}