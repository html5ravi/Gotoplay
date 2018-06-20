import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController,Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { RealdataProvider } from '../../providers/realdata/realdata';
import { Item } from '../../models/item';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the AddPeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    priority: "low"
})   
@Component({
  selector: 'page-add-people',
  templateUrl: 'add-people.html',
})
export class AddPeoplePage {
  searchQuery: string = '';
  items: any =[];
  userList:Observable<any>;

  @ViewChild('fileInput') fileInput;
  form: FormGroup;
  isReadyToSave: boolean;
  user_List:Observable<Item[]>;
  public loading: boolean;
  public tempArr:any = [];
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public rtp: RealdataProvider, public camera: Camera, public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams) {
    this.initializeItems();
    this.form = formBuilder.group({
        name:['',Validators.required],
        profilePic: [''],
        opening_Balance:['',Validators.required]
      });
      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });   

      let currentUser =JSON.parse(window.localStorage.getItem("user"));
      //console.log(currentUser)
      //Get all users
      this.loading = true;
      this.user_List = this.rtp.get('userProfile').valueChanges();
      this.user_List.subscribe(
        data=>{  },
        err=>{},
        ()=>{ this.loading = false; }
      )
      //console.log(this.user_List, "userrrrr list")
  }
  initializeItems() {
   
    
  }

  addPplToGroup(obj){
    obj.selected = !obj.selected;
    if(obj.selected){
      this.tempArr.push(obj);
    }else{
      this.tempArr.splice(this.tempArr.findIndex(function(i){
          return i.uid === obj.uid;
      }), 1);
      
    }
  }
  
  removePplFromGroup(obj){
    obj.selected = !obj.selected;
    if(!obj.selected){
      this.tempArr.splice(this.tempArr.findIndex(function(i){
          return i.uid === obj.uid;
      }), 1);
      
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
  
  done() {
    if (!this.tempArr) { return; }    
    this.viewCtrl.dismiss(this.tempArr);
    this.rtp.add(this.tempArr,"Group","Added people into your group successfully!", "Added Group");
    console.log(this.tempArr)
  }
 

  

}
