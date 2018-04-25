import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FixturesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fixtures',
  templateUrl: 'fixtures.html',
})
export class FixturesPage {
   @ViewChild('fixtures') mymodal;
   fixturesTabs:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fixturesTabs = "a";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FixturesPage');
  }
  modalOpen() {
    this.mymodal.open();
  }

  modalClose() {
    this.mymodal.close();
  }
  gotoScoreboard(){
    this.navCtrl.push('ScoreboardPage');
  }

}
