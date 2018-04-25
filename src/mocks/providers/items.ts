import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import * as firebase from 'firebase';

@Injectable()
export class Items {
  items: Item[] = [];
  events:any = [];
  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };
  uid:any = window.localStorage.getItem("currentUserId");

  constructor() {
    
    let items = firebase.database().ref('/eventItems');
    console.log(this.events);      
    // let items = [
    //   {
    //     "name": "Ravi G",
    //     "profilePic": "assets/img/speakers/bear.jpg",
    //     "about": "Burt is a Bear."
    //   },
    //   {
    //     "name": "Tashwin Ravi",
    //     "profilePic": "assets/img/speakers/cheetah.jpg",
    //     "about": "Charlie is a Cheetah."
    //   },
    //   {
    //     "name": "Donald Duck",
    //     "profilePic": "assets/img/speakers/duck.jpg",
    //     "about": "Donald is a Duck."
    //   },
    //   {
    //     "name": "Eva Eagle",
    //     "profilePic": "assets/img/speakers/eagle.jpg",
    //     "about": "Eva is an Eagle."
    //   },
    //   {
    //     "name": "Ellie Elephant",
    //     "profilePic": "assets/img/speakers/elephant.jpg",
    //     "about": "Ellie is an Elephant."
    //   },
    //   {
    //     "name": "Molly Mouse",
    //     "profilePic": "assets/img/speakers/mouse.jpg",
    //     "about": "Molly is a Mouse."
    //   },
    //   {
    //     "name": "Paul Puppy",
    //     "profilePic": "assets/img/speakers/puppy.jpg",
    //     "about": "Paul is a Puppy."
    //   }
    // ];

    // for (let item of items) {
    //   this.items.push(new Item(item));
    // }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    //this.items.push(item);
    firebase.database().ref('/eventItems').push(item);
  }

  delete(item: Item) {
    //this.items.splice(this.items.indexOf(item), 1);
    firebase.database().ref('/eventItems/'+item.key).remove();
  }
}
