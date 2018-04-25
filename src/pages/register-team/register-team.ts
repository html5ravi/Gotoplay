import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { RealdataProvider } from '../../providers/realdata/realdata';
/**
 * Generated class for the RegisterTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-team',
  templateUrl: 'register-team.html',
})
export class RegisterTeamPage {
  register:any={};
  eventId:any;
  constructor(public navCtrl: NavController, public rtp: RealdataProvider, public viewCtrl: ViewController,public navParams: NavParams) {
    this.eventId = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterTeamPage');
  }
  registerTeam(obj){
    obj.eventId = this.eventId;
    var place = 'Events/'+this.eventId+'/Teams';
    console.log(place)
    this.rtp.add(obj,place);
  }

}
