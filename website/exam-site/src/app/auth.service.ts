import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  currentUser:firebase.User | null = null;
  SignIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  SignOut() {
    return this.auth.signOut();
  }
  async isUserSignedIn() {
    this.currentUser = await firstValueFrom(this.auth.authState);
    return this.currentUser != null;
  }
  getUserID() {
    return this.currentUser?.uid;
  }
}
