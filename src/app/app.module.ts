import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from '@angular/material';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SinscrireComponent } from './sinscrire/sinscrire.component';
import { SeConnecterComponent } from './se-connecter/se-connecter.component';
import { SinscrireAdminComponent } from './sinscrire-admin/sinscrire-admin.component';
import { SeConnecterAdminComponent } from './se-connecter-admin/se-connecter-admin.component';
import { AjouterProduitComponent } from './ajouter-produit/ajouter-produit.component';
import { ClientComponent } from './client/client.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { ProduitsComponent } from './produits/produits.component';
import { AdminComponent } from './admin/admin.component';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur/ajouter-utilisateur.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import { ModifierUtilisateurComponent } from './modifier-utilisateur/modifier-utilisateur.component';
import { ModifierProduitComponent } from './modifier-produit/modifier-produit.component';
import { PanierComponent } from './panier/panier.component';
import { ContactComponent } from './contact/contact.component';
import { LogoComponent } from './logo/logo.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { IntroComponent } from './intro/intro.component';
import { AProposDeNousComponent } from './a-propos-de-nous/a-propos-de-nous.component';
import { NosProduitsComponent } from './nos-produits/nos-produits.component';
import { FaqComponent } from './faq/faq.component';
import { ContactezNousComponent } from './contactez-nous/contactez-nous.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { PiedDePageComponent } from './pied-de-page/pied-de-page.component';
import { RetourVersLeHautComponent } from './retour-vers-le-haut/retour-vers-le-haut.component';
import { BienvenueComponent } from './bienvenue/bienvenue.component';
import { ConnectezOuInscrivezVousComponent } from './connectez-ou-inscrivez-vous/connectez-ou-inscrivez-vous.component';
import { SeDeconnecterComponent } from './se-deconnecter/se-deconnecter.component';
import { MatMenuModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { LogoFComponent } from './logo-f/logo-f.component';
import { LogoCComponent } from './logo-c/logo-c.component';
import { MenuAdminAGaucheComponent } from './menu-admin-agauche/menu-admin-agauche.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { LogoAComponent } from './logo-a/logo-a.component';
import { ListeProduitsAdminComponent } from './liste-produits-admin/liste-produits-admin.component';

const liens: Routes = [
  { path: 'sinscrire', component: SinscrireComponent},
  { path: 'seconnecter', component: SeConnecterComponent},
  { path: 'sinscrireAdmin', component: SinscrireAdminComponent },
  { path: 'seconnecterAdmin', component: SeConnecterAdminComponent },
  { path: 'ajouterProduit', component: AjouterProduitComponent},
  { path: 'modifierProduit', component: ModifierProduitComponent },
  { path: 'ajouterUtilisateur', component: AjouterUtilisateurComponent },
  { path: 'modifierUtilisateur', component: ModifierUtilisateurComponent },
  { path: 'client', component: ClientComponent },
  { path: 'fournisseur', component: FournisseurComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'listeProduits', component: ListeProduitsComponent },
  { path: 'listeProduitsAdmin', component: ListeProduitsAdminComponent },
  { path: 'listeUtilisateurs', component: ListeUtilisateursComponent },
  { path: 'produits', component: ProduitsComponent},
  { path: 'panier', component: PanierComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SinscrireComponent,
    SeConnecterComponent,
    SinscrireAdminComponent,
    SeConnecterAdminComponent,
    AjouterProduitComponent,
    ClientComponent,
    FournisseurComponent,
    ListeProduitsComponent,
    ProduitsComponent,
    AdminComponent,
    AjouterUtilisateurComponent,
    ListeUtilisateursComponent,
    ModifierUtilisateurComponent,
    ModifierProduitComponent,
    PanierComponent,
    ContactComponent,
    LogoComponent,
    NavMenuComponent,
    IntroComponent,
    AProposDeNousComponent,
    NosProduitsComponent,
    FaqComponent,
    ContactezNousComponent,
    NewsletterComponent,
    PiedDePageComponent,
    RetourVersLeHautComponent,
    BienvenueComponent,
    ConnectezOuInscrivezVousComponent,
    SeDeconnecterComponent,
    LogoFComponent,
    LogoCComponent,
    MenuAdminAGaucheComponent,
    TopMenuComponent,
    LogoAComponent,
    ListeProduitsAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(liens),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatMenuModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [AngularFirestoreModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
