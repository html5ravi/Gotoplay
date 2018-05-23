import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup } from '@angular/forms';
// import firebase from 'firebase';
import { RealdataProvider } from '../../providers/realdata/realdata';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild('fileInput') fileInput;
  profile:any = JSON.parse(window.localStorage.getItem("user"));
  form: FormGroup;
  currentUserId:any = window.localStorage.getItem("currentUserId");
  onErrorPic:any;

  constructor(public navCtrl: NavController, private rdp : RealdataProvider, public formBuilder: FormBuilder, public navParams: NavParams, public camera: Camera, public alertCtrl: AlertController) {
    this.onErrorPic = "assets/img/profile/200x200jordan.png";
    this.form = formBuilder.group({
        profilePic: ['']
      });    
    
  }

  setDefaultPic() {
  //this.pic = "assets/img/profile/200x200jordan.png";
}

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 100,
        targetHeight: 100,
        quality:100
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
        
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
      this.profile.photoURL = imageData;
      //this.uploadToFS(imageData);
      this.uploadToFB(this.profile)
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  uploadToFB(obj){
    let place = "userProfile";
    this.rdp.update(place,this.currentUserId,obj);
  }

  // uploadToFS(imageUrl){
  //   let storageRef = firebase.storage().ref();
  //   // Create a timestamp as filename
  //   const filename = Math.floor(Date.now() / 1000);

  //   // Create a reference to 'images/todays-date.jpg'
  //   const imageRef = storageRef.child(`images/${filename}.jpg`);

  //   imageRef.putString(imageUrl, firebase.storage.StringFormat.DATA_URL)
  //     .then((snapshot)=> {
  //       // Do something here when the data is succesfully uploaded!
  //       alert("Uploaded successfully")
  //   });
  // }




}
