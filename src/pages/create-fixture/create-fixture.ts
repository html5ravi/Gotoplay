import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,reorderArray } from 'ionic-angular';

/**
 * Generated class for the CreateFixturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation. [9986367885 - Mallika Arjuna]
 */

@IonicPage()
@Component({
  selector: 'page-create-fixture',
  templateUrl: 'create-fixture.html',
})
export class CreateFixturePage {
  songs:any[];
  editButton: string = 'Edit';
  editing: boolean = false;
  createFixture:any;
  pools:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.createFixture = "create";
    this.pools = "a";
    this.songs = [
    {
      title: 'Everything Beta',
      band: 'Phoria',
      album: 'Volition'
    },
    {
      title: 'Hello',
      band: 'Adele',
      album: '25'
    },
    {
      title: 'Bohemian Rhapsody',
      band: 'Queen',
      album: 'A Night at the Opera'
    },
    {
      title: 'Don\'t Stop Believin\'',
      band: 'Journey',
      album: 'Escape'
    },
    {
      title: 'Smells Like Teen Spirit',
      band: 'Nirvana',
      album: 'Nevermind'
    },
    {
      title: 'All You Need Is Love',
      band: 'The Beatles',
      album: 'Magical Mystery Tour'
    },
    {
      title: 'Hotel California',
      band: 'The Eagles',
      album: 'Hotel California'
    },
    {
      title: 'The Hand That Feeds',
      band: 'Nine Inch Nails',
      album: 'With Teeth'
    },
    {
      title: 'Who Are You',
      band: 'The Who',
      album: 'Who Are You'
    }];
      }

  toggleEdit() {
    this.editing = !this.editing;
    if (this.editing) {
      this.editButton = 'Done';
    } else {
      this.editButton = 'Edit';
    }
  }

  gotoTeamRegister(){
    
  }

  reorderData(indexes: any) {
    this.songs = reorderArray(this.songs, indexes);
  }

}
