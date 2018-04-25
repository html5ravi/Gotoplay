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
  public category:any = [{eventCategory:""}];
  form: FormGroup;
  eventItem:any={};
  terms:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public formBuilder: FormBuilder, public camera: Camera,public rtp: RealdataProvider) {
    
    this.editItem = navParams.get('item');
    this.terms = this.rtp.get('Terms');

    console.log(this.editItem)
    
  
    
    
    if(this.editItem){
      console.log("inside")
      this.eventItem.title="Something went wrong";
      this.eventItem.contacts=[{
        name:"Ravi",
        mobile:"8754875478"
      }];      
    }

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
        category: formBuilder.array([
          this.initCategoryFields()
        ]),
        eventType:[''],
        terms:[[],Validators.required],
         medal:[false],
         goodies:[false],
         certificate:[false],
         refreshment:[false],
         lunch:[true],
      });
      
      this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    // }else{
    //   console.log("edit section")   
    // }
    // Watch the form for changes, and
    
    
  }


  //Contacts
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

   //Category
   initCategoryFields() : FormGroup
   {
      return this.formBuilder.group({
         eventCategory 		: ['', Validators.required],
         md_entry:[''],
         ms_entry:[''],
         wd_entry:[''],
         ws_entry:[''],
         xd_entry:[''],
         md_1st:[''],
         ms_1st:[''],
         wd_1st:[''],
         ws_1st:[''],
         xd_1st:[''],
         md_2nd:[''],
         ms_2nd:[''],
         wd_2nd:[''],
         ws_2nd:[''],
         xd_2nd:[''],
         md_3rd:[''],
         ms_3rd:[''],
         wd_3rd:[''],
         ws_3rd:[''],
         xd_3rd:[''],
         md_4th:[''],
         ms_4th:[''],
         wd_4th:[''],
         ws_4th:[''],
         xd_4th:[''],
      });
   }
  
   addCategory() : void
   {
      const control = <FormArray>this.form.controls.category;
      control.push(this.initCategoryFields());
   }
   
   removeCategory(i : number) : void
   {
      const control = <FormArray>this.form.controls.category;
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
