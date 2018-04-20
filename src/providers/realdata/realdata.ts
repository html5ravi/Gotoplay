import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
 //import { Observable } from 'rxjs/Observable';
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
  
 
  constructor(private readonly afs: AngularFirestore) {
    
    //this.items = this.itemsCollection.valueChanges();
    //this.itemsCollection = afs.collection<Item>('items');
    
    }
  

  add(obj,place) {
    console.log(obj,"add/edit");
    const eventCollection = this.afs.collection<Item>(place);
    eventCollection.add(obj)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      obj.id=docRef.id;
      eventCollection.doc(docRef.id).set(obj);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  get(place){
    this.itemsCollection = this.afs.collection<Item>(place);
    return this.itemsCollection.valueChanges();
  }

  delete(obj,place){  
    this.itemsCollection = this.afs.collection<Item>(place);
    this.itemsCollection.doc(obj.id).delete();
  }

  update(obj,place){  
    this.itemsCollection = this.afs.collection<Item>(place);
    this.itemsCollection.doc(obj.id).update(obj);
  }

  
}
