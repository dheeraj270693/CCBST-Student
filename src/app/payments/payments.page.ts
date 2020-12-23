import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  PAYMENT_URL = 'https://ccbst.ccbst.org/student/payments';
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

//https://ccbst.org/CCBST-LIVE/student
  constructor(
    private browser: InAppBrowser,

  ) { }

  ngOnInit() {

    this.openInAppBrowser();
  }

  openInAppBrowser(){
    // var url = "";
    // var options = InAppBrowserOptions={
    //   zoom:'yes'
    // }

    this.browser.create(this.PAYMENT_URL,'_self', this.options);
  }

}
// BD10407201907