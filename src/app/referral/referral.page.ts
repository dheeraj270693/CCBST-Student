import { Component, OnInit } from '@angular/core';
import { WebService} from '../services/web.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {
  get first_name() {
    return this.referralForm.get("first_name");
  }
  get last_name() {
    return this.referralForm.get("last_name");
  }
  get email() {
    return this.referralForm.get("email");
  }
  get phone_no() {
    return this.referralForm.get('phone_no');
  }
  get description() {
    return this.referralForm.get('description');
  }
 
  public errorMessages = {
    first_name: [
      { type: 'required', message: 'First Name is required' },
      { type: 'maxlength', message: 'First Name cannot be longer than 100 characters' }
    ],
    last_name: [
      { type: 'required', message: 'Last Name is required' },
      { type: 'maxlength', message: 'Last Name cannot be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    phone_no: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'minlength', message: 'Phone number cannot be shorter than 10 numbers' },
      { type: 'pattern', message: 'Please enter a valid phone number' }
    ],
    description: [
      {
        type: 'maxlength', message: 'Description cannot be longer than 300 characters'
      }
    ]
  };


  referralForm = this.formBuilder.group({
    first_name: ['', [Validators.required, Validators.maxLength(100)]],
    last_name: ['', [Validators.required, Validators.maxLength(100)]],

    email: [
      '',
      [
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
        Validators.pattern('[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')

      ]
    ],
    phone_no: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
      ]
    ],
    description: ['', [Validators.maxLength(300)]],
  });

  constructor(
    private storage: Storage,
    private WebService: WebService,
    public toastController: ToastController,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
  }

  clearData(){
    (document.getElementById('first_name') as HTMLInputElement).value = "";
    (document.getElementById('last_name') as HTMLInputElement).value = "";
    (document.getElementById('email') as HTMLInputElement).value = "";
    (document.getElementById('phone_no') as HTMLInputElement).value = "";
    (document.getElementById('description') as HTMLInputElement).value = "";
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  submitBtnClicked() {
    console.log(this.referralForm.value);
  
    // let referralParams  = {
    //   'first_name': firstName,
    //   'last_name': lastName,
    //   'email': emailAddress,
    //   'phone_no': PhoneNo,
    //   'description': description
    //   // 'password': 'BC136012019141'
    // };
      this.postReferral(this.referralForm.value)
  }

  postReferral(referralParams){
    var authToken = "";
    this.storage.get('AUTH_TOKEN').then((token) => {
      authToken = "Bearer " + token;

      this.WebService.postReferralData(referralParams, authToken).subscribe((data)=>{
        console.log("Response: ",data);
        // this.clearData();
        this.presentToast(data["success"]);
        this.router.navigate(['/', 'dashboard']);
    
        }, error => {
          console.log("Error: ",error);
          console.log('Data Not Found...');
          this.presentToast(error["message"]);
      }); 
    });
  }
}
