import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, Loading, NavController, ToastController,LoadingController, AlertController, } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../validators/email';
import { AuthProvider } from '../../providers/auth/auth';


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

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder
    ) {

      this.loginForm = formBuilder.group({
        email: ['',
        Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])]
      });

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
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

  // Attempt to login in through our User service
  /*doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }*/
}
