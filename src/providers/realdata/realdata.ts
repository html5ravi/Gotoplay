import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import firebase from 'firebase';
 import { Observable } from 'rxjs/Observable';
import { Item } from '../../models/item';
//export interface Item {title:string, subTitle:string, bannerPic:string;}
/*
  Generated class for the RealdataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RealdataProvider {
  
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
 
  constructor(private readonly db: AngularFireDatabase) {
      
    
    }
  
  get(place){
    return this.db.list(place);
    
    // return new Promise((resolve) =>
    //     {
    //         this.itemsRef = this.db.list(place);
    //         this.itemsRef.subscribe(data=>{
    //             resolve(data);
    //         });
    //     });   
    //return this.itemsRef = this.db.list(place);
  }
  add(obj,place) {
    //console.log(obj)
    let id = this.db.createPushId();
    if(id){
      obj.id = id;
      this.db.list(place).set(id, obj);
    }
  }

  update(place,key,obj) {
    //this.itemsRef.update(key, obj);
    firebase
          .database()
          .ref(place)
          .child(key)
          .set(obj);
  }

  delete(place,key) {
    //this.itemsRef.remove(key); 
    this.db.list(place).remove(key);
  }
  
  deleteEverything() {
    this.itemsRef.remove();
  }

  
}
