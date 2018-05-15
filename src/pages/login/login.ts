import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, Loading, NavController, ToastController,LoadingController, AlertController, MenuController} from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { Facebook } from '@ionic-native/facebook';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import * as firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;
  public loginForm: FormGroup;
  public loading: Loading;

  isLoggedIn:boolean = false;
  users: any;



  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public menu: MenuController,
    private fb: Facebook
    ) {

      this.loginForm = formBuilder.group({
        email: ['html5ravi@gmail.com',
        Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['RaviG#09',
        Validators.compose([Validators.minLength(6), Validators.required])]
      });

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });


    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));



  }


  loginUser(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email,
        this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(MainPage);
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  // fbLogin(){
  //   var provider = new firebase.auth.FacebookAuthProvider();
  //   firebase.auth().signInWithPopup(provider).then(function(result) {
  //     var user = result.user;
  //     console.log(result)
  //     window.localStorage.setItem("currentUserId",user.uid);
  //     this.navCtrl.setRoot('TabsPage');        
  //       firebase.database()
  //         .ref('/userProfile')
  //         .child(result.user.uid)
  //         .set({ 
  //           email: user.email,
  //           displayName: user.displayName,
  //           photo: user.photoURL,
  //           phoneNumber: user.phoneNumber
  //         });
          
  //   }).catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     // ...
  //   });
  // }


ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
  

  login() {
  
  this.fb.login(['email'])
    .then( response => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
        .then( users => { 
          console.log("Firebase res: " + JSON.stringify(users));
          this.navCtrl.setRoot('TabsPage'); 
          firebase.database()
          .ref('/userProfile')
          .child(users.uid)
          .set({ 
            email: users.email,
            displayName: users.displayName,
            photoURL: users.photoURL
          });
        });

    }).catch((error) => { console.log(error) });
    //this.fb.login(['public_profile', 'email'])
    // .then(res => {
    //   if(res.status === "connected") {
    //     this.isLoggedIn = true;
    //     this.getUserDetail(res.authResponse.userID);
    //   } else {
    //     this.isLoggedIn = false;
    //   }
    // })
    // .catch(e => console.log('Error logging into Facebook', e));
};

getUserDetail(userid) {
  this.fb.api("/"+userid+"/?fields=id,email,name,picture",["public_profile"])
    .then(res => {
      console.log(res);
      this.users = res;
      this.navCtrl.setRoot('TabsPage');        
        // firebase.database()
        //   .ref('/userProfile')
        //   .child(users.uid)
        //   .set({ 
        //     email: user.email,
        //     displayName: user.displayName,
        //     photo: user.photoURL,
        //     phoneNumber: user.phoneNumber
        //   });
    })
    .catch(e => {
      console.log(e);
    });
}

 
}
