import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
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
  currentUserId:any;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  eventListRef$:AngularFireList<any>;
  constructor(private readonly db: AngularFireDatabase,private alertCtrl: AlertController) {
      this.currentUserId = window.localStorage.getItem("currentUserId");
      console.log('current User Id',this.currentUserId);
  }
  
  //: Observable<any>
   renderEvents(place) : Promise<any>
    {
        return new Promise((resolve) =>
        {
            this.eventListRef$ = this.db.list(place);
            this.eventListRef$.valueChanges().subscribe(data=>{
                resolve(data);
            });            
        });                       
        
    }

  getObj(place){
    return this.db.object(place);
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
  add(obj,place,t,st) {
    //console.log(obj)
    let id = this.db.createPushId();
    if(id){
      obj.id = id;
      obj.userId = this.currentUserId;
      return this.db.list(place).set(id, obj).then(res=>{
          let alert = this.alertCtrl.create({
          title: t,
          subTitle: st,
          buttons: ['Ok']
        });
        alert.present();
      });
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

  delete(place,key,title,msg) {
    
        let alert = this.alertCtrl.create({
        title: title,
        message: msg,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              //console.log('Cancel clicked');
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.db.list(place).remove(key);
            }
          }
        ]
      });
      alert.present();
    
  }

  deleteEverything() {
    this.itemsRef.remove();
  }




  
}
