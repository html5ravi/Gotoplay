import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule,IonicPageModule } from 'ionic-angular';

import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { TabsPage } from '../pages/tabs/tabs';
import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { FIREBASE_CREDENTIALS } from "./firebase-credentials";
import { Facebook } from '@ionic-native/facebook';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { DbProvider } from '../providers/db/db';
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.

import { MymodalComponent } from '../components/mymodal/mymodal';
//import { EventsService } from '../pages/events/events.service';
import { RealdataProvider } from '../providers/realdata/realdata';
import { AngularFireDatabase } from 'angularfire2/database';
import { StringFilterPipe} from './string-filter.pipe';
import { AngularFireAuth } from 'angularfire2/auth';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// import * as firebase from "firebase";
// export default !firebase.apps.length ? firebase.initializeApp(FIREBASE_CREDENTIALS) : firebase.app();

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    MymodalComponent,
    TabsPage
  ],
  imports: [    
    IonicPageModule.forChild(MymodalComponent),
    FormsModule,
    HttpModule,
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  exports:[MymodalComponent],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    Api,
    RealdataProvider,
    AngularFirestore,
    //EventsService,
    NativeStorage,    
    Facebook,
    AngularFireDatabase,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    DbProvider,
    AngularFireAuth,
    RealdataProvider
  ]
})
export class AppModule { }
