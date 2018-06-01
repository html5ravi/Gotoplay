import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CourtSharingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-court-sharing',
  templateUrl: 'court-sharing.html',
})
export class CourtSharingPage {
    contributors:any=[
        {
            name:"Ravi G",
            id:1,
            toPayAmount:1050,
            img:"assets/img/profile/200x200kobe.png"
        },{
            name:"Noble A",
            id:2,
            toPayAmount:450,
            img:"assets/img/profile/200x200kobe.png"
        },{
            name:"Guru",
            id:3,
            toPayAmount:1200,
            img:"assets/img/profile/200x200kobe.png"
        },{
            name:"Raghavkumar",
            id:4,
            toPayAmount:2500,
            img:"assets/img/profile/200x200kobe.png"
        },
    ];
    currentDates:any=[
        {
            date:"12/05/2018",
            playedAmount:450,
            contributors:[1,2,3,4],
            shuttleBy:"Ravi"
        },
        {
            date:"11/05/2018",
            playedAmount:300,
            contributors:[1,2,3,4],
            shuttleBy:"Noble"
        },
        {
            date:"10/05/2018",
            playedAmount:450,
            contributors:[1,2,3,4],
            shuttleBy:"Arun"
        },
        {
            date:"09/05/2018",
            playedAmount:280,
            contributors:[1,2,3,4],
            shuttleBy:"Guru"
        }
    ];
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourtSharingPage');
  }


  toggleSection(i) {
    this.currentDates[i].open = !this.currentDates[i].open;
  } 
  

}
