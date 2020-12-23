import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MenuController } from '@ionic/angular';
import { WebService} from '../services/web.service';
import { Dictionary } from "lodash";

import { from } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public toastController: ToastController,
    private router: Router,
    private storage: Storage,
    private browser: InAppBrowser,
    public menuCtrl: MenuController,
    private WebService: WebService
    ) { 
    // this.openInAppBrowser();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
 }
 ionViewDidLeave() {
    this.menuCtrl.enable(true);
 } 
 
  ngOnInit() {
    // this.openInAppBrowser();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  openInAppBrowser(){
    var url = "https://ccbst.ccbst.co/student/payments";
    this.browser.create(url,'_blank')
  }

 addNumber(){
   var num1 = 3;
   var num2 = 4;
    var sum = num1+num2;
    console.log("Sum of Two number::",sum);
  }

  loginBtnClicked(){
    let passwordText = (document.getElementById('passwordText') as HTMLInputElement).value;
    var response:Dictionary<string>= {};

    let loginParams  = {
      'password': passwordText
    };
   
    this.addNumber();
    // this.router.navigate(['/', 'dashboard']);
    // this.storage.get('isLogin').then((val) => {
    //   console.log('Are u logged in?', val);
    // });
  
    // this.randomNumber();


  this.WebService.loginPostData(loginParams).subscribe((data)=>{

    this.storage.set('AUTH_TOKEN', data['token']);
    this.storage.set('isLogin', true);

    this.router.navigate(['/', 'dashboard']);
    // this.storage.get('isLogin').then((val) => {
    //   console.log('Are u logged in?', val);
    // });
  }, error => {
      console.log(error);
      console.log('Could Not Login...');
      this.presentToast(error["message"]);
  });
  }

}
