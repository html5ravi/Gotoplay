import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController,NavParams } from 'ionic-angular';
import { RealdataProvider } from '../../providers/realdata/realdata';

//import { Item } from '../../models/item';
@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  editItem:any;
  item: any;
  public contacts:any = [{mobile:"",name:""}];
  
  form: FormGroup;
  terms:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public formBuilder: FormBuilder, public camera: Camera,public rtp: RealdataProvider) {
    
    this.editItem = navParams.get('item');
    this.terms = this.rtp.get('Terms');


    

    
    if(!this.editItem){
     this.form = formBuilder.group({
        bannerPic: [''],
        title: ['', Validators.required],
        subTitle: [''],
        startDate:[''],
        endDate:[''],
        address1:[''],
        address2:[''],
        country:[''],
        state:[''],
        city:[''],
        contacts: formBuilder.array([
            this.initContactFields()
         ]),
         medal:[false],
         goodies:[false],
         certificate:[false],
         refreshment:[false],
         lunch:[true],
      });
      
      
    }else{
      this.form = formBuilder.group({
        bannerPic: this.editItem.bannerPic,
        title: this.editItem.title,
        subTitle: this.editItem.subTitle,
        startDate: this.editItem.startDate,
        endDate: this.editItem.endDate,
        address1:this.editItem.address1,
        address2:this.editItem.address2,
        country:this.editItem.country,
        state:this.editItem.state,
        city:this.editItem.city,
        contactName:this.editItem.contactName,
        contactMobile:this.editItem.contactMobile
      });      
    }
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    
  }



  initContactFields() : FormGroup
   {
      return this.formBuilder.group({
         name 		: ['', Validators.required],
         mobile 		: ['', Validators.required]
      });
   }
   addContact() : void
   {
      const control = <FormArray>this.form.controls.contacts;
      control.push(this.initContactFields());
   }
   removeContact(i : number) : void
   {
      const control = <FormArray>this.form.controls.contacts;
      control.removeAt(i);
   }
   
   manage(val : any) : void
   {
      console.dir(val);
   }




  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'bannerPic': 'data:image/jpg;base64,' + data });
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
      this.form.patchValue({ 'bannerPic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['bannerPic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
    console.log(this.form.value)
  }

  
}
