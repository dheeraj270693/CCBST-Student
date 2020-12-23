import { Component, OnInit } from '@angular/core';
import { WebService} from '../services/web.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {

  constructor(
    private storage: Storage,
    private WebService: WebService,
    public toastController: ToastController,
    private router: Router,

  ) { }

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
    let firstName = (document.getElementById('first_name') as HTMLInputElement).value;
    let lastName = (document.getElementById('last_name') as HTMLInputElement).value;
    let emailAddress = (document.getElementById('email') as HTMLInputElement).value;
    let PhoneNo = (document.getElementById('phone_no') as HTMLInputElement).value;
    let description = (document.getElementById('description') as HTMLInputElement).value;

    let referralParams  = {
      'first_name': firstName,
      'last_name': lastName,
      'email': emailAddress,
      'phone_no': PhoneNo,
      'description': description
      // 'password': 'BC136012019141'
    };
      this.postReferral(referralParams)
  }

  postReferral(referralParams){
    var authToken = "";
    // var marksheetData = [{}];
    this.storage.get('AUTH_TOKEN').then((token) => {
      authToken = "Bearer " + token;

      this.WebService.postReferralData(referralParams, authToken).subscribe((data)=>{
        console.log("Response: ",data);
        this.clearData();
        this.presentToast(data["message"]);
        this.router.navigate(['/', 'dashboard']);
    
        }, error => {
          console.log("Error: ",error);
          console.log('Data Not Found...');
          this.presentToast(error["error"]);
      }); 
    });
  }
}
