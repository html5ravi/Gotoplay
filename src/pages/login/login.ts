import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, Loading, NavController, ToastController,LoadingController, AlertController} from 'ionic-angular';
import { Validators, FormGroup,FormBuilder, FormControl } from '@angular/forms';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

import { EmailValidator } from '../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { FacebookLoginService } from '../facebook-login/facebook-login.service';
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


  login: FormGroup;
 
  

  // Our translated text strings
  private loginErrorString: string;
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder,
    public facebookLoginService: FacebookLoginService,
    ) {

      this.loginForm = formBuilder.group({
        email: ['',
        Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])]
      });

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    

    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('test', Validators.required)
    });

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

  

  // as per theme
  doFacebookLogin() {
    this.loading = this.loadingCtrl.create();

    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
    // let this = this;

    this.facebookLoginService.getFacebookUser()
      .then((data) => {
        // user is previously logged with FB and we have his data we will let him access the app
        this.navCtrl.setRoot(MainPage);
      }, (error) => {
        //we don't have the user data so we will ask him to log in
        this.facebookLoginService.doFacebookLogin()
        .then((res) => {
          this.loading.dismiss();
          this.navCtrl.setRoot(MainPage);
        }, (err) => {
          console.log("Facebook Login error", err);
        });
      });
    }


 
}
