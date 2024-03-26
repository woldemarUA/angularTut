import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { User } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  user$: Observable<any> = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      this.userSubject.next(user);
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
    await signOut(this.auth);
  }
}
