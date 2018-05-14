import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { RealdataProvider } from '../../providers/realdata/realdata';
import { Item } from '../../models/item';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import {AngularFireDatabase } from 'angularfire2/database';
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
  events:any;
  public eventListRef$:any;
  eventRef$:any=[];
  categoryList:any=[];
  constructor(public navCtrl: NavController, public rtp: RealdataProvider, public viewCtrl: ViewController,public navParams: NavParams,public db:AngularFireDatabase) {
    this.events = navParams.get('item');
    this.categoryList = this.events.category;
    console.log(this.events.id)
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegisterTeamPage');
  }
  registerTeam(obj){
    if(this.events.id){
      this.rtp.add(obj,'Events/'+this.events.id+'/Teams','Registration!','Your team registered successfuly!');
      this.viewCtrl.dismiss();
    }
  }
  

}
