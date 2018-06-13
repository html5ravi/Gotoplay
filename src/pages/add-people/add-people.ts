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

@IonicPage()
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
  public loading: Loading;
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
      this.user_List = this.rtp.get('userProfile').valueChanges();
      
  }
  initializeItems() {
   
    
  }

  addToGroup(obj){
    
    this.tempArr.push(obj)
    console.log(this.tempArr)
  }
  

  cancel() {
    this.viewCtrl.dismiss();
  }
  
  // done() {
  //   if (!this.form.valid) { return; }    
  //   this.viewCtrl.dismiss(this.form.value);
  //   // console.log(this.form.value)
  // }
 

  

}
