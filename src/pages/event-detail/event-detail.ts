import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

   public form 			: FormGroup;



   constructor(public navCtrl: NavController,public navParams: NavParams,private formBuilder: FormBuilder)
   {
      this.form = this.formBuilder.group({
         title       	  : ['', Validators.required],
         contacts     : this.formBuilder.array([
            this.initContactFields()
         ])
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



}