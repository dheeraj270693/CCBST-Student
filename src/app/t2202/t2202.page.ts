import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-t2202',
  templateUrl: './t2202.page.html',
  styleUrls: ['./t2202.page.scss'],
})

export class T2202Page implements OnInit {
  T2202URL = "https://ccbst.ccbst.org/student/t2202-forms";
  constructor(
    private browser: InAppBrowser,
    private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      navigator['app'].exitApp();
    });
  
   }

  ngOnInit() {
    this.openInAppBrowser();
  }

  openInAppBrowser(){
    // var url = "https://ccbst.ccbst.co/student/payments";
    // var options = InAppBrowserOptions={
    //   zoom:'yes'
    // }
    this.browser.create(this.T2202URL,'_self' );
    
  }




}
