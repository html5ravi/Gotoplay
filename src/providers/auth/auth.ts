import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

    //User Login
    loginUser(email: string, password: string): Promise<any> {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    //Signup User
    signupUser(email: string, password: string): Promise<any> {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then( newUser => {
          firebase
          .database()
          .ref('/userProfile')
          .child(newUser.uid)
          .set({ email: email });
        });
    }

    //Reset password
    resetPassword(email: string): Promise<void> {
      return firebase.auth().sendPasswordResetEmail(email);
    }

    //Logout
    logoutUser(): Promise<void> {
      return firebase.auth().signOut();
    }


}
