import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { Network } from '@ionic-native/network';
// import { FirstRunPage } from '../pages/pages';
// import { TabsPage } from '../pages/tabs/tabs';
// import { LoginPage } from '../pages/login/login';
import { Settings } from '../providers/providers';
import { AuthProvider } from '../providers/auth/auth';
import * as firebase from 'firebase';
import { RealdataProvider } from '../providers/realdata/realdata';


@Component({
  templateUrl: 'app.html',
  selector: 'my-app',
  //template: `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any; //FirstRunPage
  @ViewChild(Nav) nav: Nav;
  profile:any;
  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'My Profile', component: 'ProfilePage' },
    { title: 'Court Sharing', component: 'CourtSharingPage' },
    { title: 'Welcome', component: 'WelcomePage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Login', component: 'LoginPage' },
    { title: 'Signup', component: 'SignupPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' }
  ]

  constructor(private translate: TranslateService, 
              private network: Network,
              public rtp: RealdataProvider, private auth:AuthProvider,  platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    
    this.auth.afAuth.authState
      .subscribe(
        user => {                 
          //console.log("user details:", user)
          if (user) {
            this.rtp.getObj(`userProfile/${user.uid}`).valueChanges().subscribe(res=>{
              this.profile = res;
              window.localStorage.setItem("user",JSON.stringify(res));
              if(this.profile.photoURL == undefined){
                this.rootPage = 'ProfilePage';
              }else{
                this.rootPage = 'CourtSharingPage';
              }
              console.log("user details:", this.profile)
            });   
            
          } else {
            this.rootPage = 'TutorialPage';
          }
        },
        () => {
          this.rootPage = 'FirstRunPage';
        }
      );

      // watch network for a disconnect
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        alert('network was disconnected :-(, Please connect wifi / mobile internet to continue!');
      });

      // stop disconnect watch
      disconnectSubscription.unsubscribe();
      // watch network for a connection
let connectSubscription = this.network.onConnect().subscribe(() => {
  alert('network connected!');
  // We just got a connection but we need to wait briefly
   // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      alert('we got a wifi connection, woohoo!');
    }
  }, 3000);
});

// stop connect watch
connectSubscription.unsubscribe();


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }


  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //   });

    
  

  logout(){
    firebase.auth().signOut();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
