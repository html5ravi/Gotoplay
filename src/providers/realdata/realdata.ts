import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/Observable';
import { Item } from '../../models/item';
//export interface Item {title:string, subTitle:string, bannerPic:string;}
/*
  Generated class for the RealdataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RealdataProvider {
  private itemsCollection: AngularFirestoreCollection<Item>;
  //items: Observable<Item[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    //this.items = this.itemsCollection.valueChanges();


    
  }
  add(obj,place) {

    const eventCollection = this.afs.collection<Item>(place);
    eventCollection.add(obj);
    // const id = this.afs.createId();
    // const item: Item = { id, name };
    // this.itemsCollection.doc(id).set(item);
  }
  get(place){
    this.itemsCollection = this.afs.collection<Item>(place);
    return this.itemsCollection.valueChanges();
  }

}
