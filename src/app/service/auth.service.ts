import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;
  constructor(private auth: Auth) {
    this.user$ = new Observable((subscriber) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          subscriber.next(user);
        } else {
          subscriber.next(null);
        }
      });
    });
  }

  async login(email: string, password: string): Promise<User | null> {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    return userCredential.user;
  }

  async register(email: string, password: string) {
    const response = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return response;
  }

  async logOut() {
    try {
      await signOut(this.auth);
    } catch (err) {
      console.log(err);
    }
  }
}
