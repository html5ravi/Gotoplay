// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
//import AuthProvider = firebase.auth.AuthProvider;
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
			this.user = user;
      console.log(user)
      if(user != null){
        window.localStorage.setItem("currentUserId",user.uid);
      }
		});
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
      window.localStorage.clear()
      return firebase.auth().signOut();
    }


}
