import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,reorderArray } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { RealdataProvider } from '../../providers/realdata/realdata';
import { Item } from '../../models/item';


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
  teams: Observable<Item>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public rtp: RealdataProvider) {
    let item = navParams.get('item');
    console.log(item.id)
    this.teams = this.rtp.get('Events/'+item.id+'/Teams').valueChanges();
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

  

  reorderData(indexes: any) {
    this.songs = reorderArray(this.songs, indexes);
  }

}
