import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  sendPasswordResetEmail,
  // updatePhoneNumber,
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
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      return userCredential.user;
    } catch (err) {
      //   // Assuming displayError is a method that displays the error message to the user
      // this.displayError('Login failed. Please check your email and password.');
      throw err;
    }
  }
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);

      return userCredential.user;
    } catch (err) {
      //   // Assuming displayError is a method that displays the error message to the user
      // this.displayError('Login failed. Please check your email and password.');
      throw err;
    }
  }

  async updateUserPassword(oldPassword: string, newPassword: string) {
    if (!this.auth.currentUser) {
      throw new Error('No user logged in.');
    }
    try {
      const credential = EmailAuthProvider.credential(
        this.auth.currentUser.email,
        oldPassword
      );
      await reauthenticateWithCredential(this.auth.currentUser, credential);
      const result = await updatePassword(this.auth.currentUser, newPassword);
    } catch (err) {
      //   // Assuming displayError is a method that displays the error message to the user
      // this.displayError('Login failed. Please check your email and password.');
      throw err;
    }
  }
  async register(email: string, password: string) {
    try {
      const response = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return response;
    } catch (err) {
      //   // Assuming displayError is a method that displays the error message to the user
      // this.displayError('Login failed. Please check your email and password.');
      throw err;
    }
  }
  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  refreshUserData() {
    this.auth.currentUser.reload().then(() => {
      this.userSubject.next(this.auth.currentUser);
    });
  }

  async updateUserProfile(userData: Partial<User>): Promise<void> {
    if (this.auth.currentUser) {
      try {
        await updateProfile(this.auth.currentUser, userData);

        const refreshedUser = await this.auth.currentUser.reload();
        this.userSubject.next(this.auth.currentUser);

        // method that displays the  message to the user
      } catch (err) {
        throw err;
      }
    }
  }

  async logOut() {
    await signOut(this.auth);
  }
}
