import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-share-payment',
  templateUrl: 'add-share-payment.html',
})
export class AddSharePaymentPage {
  form: FormGroup;
  isReadyToSave: boolean;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public formBuilder: FormBuilder, public navParams: NavParams) {
    this.form = formBuilder.group({
        court_amount:['',Validators.required],
        courPaidBy:['',Validators.required],
        shuttle_amount:['',Validators.required],
        shuttlePaidBy:['',Validators.required],
        contributors:[[],Validators.required]
      });      
      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });   
  }

  
  cancel() {
    this.viewCtrl.dismiss();
  }
  
  done() {
    if (!this.form.valid) { return; }    
    this.viewCtrl.dismiss(this.form.value);
    // console.log(this.form.value)
  }

}
//shareAmount