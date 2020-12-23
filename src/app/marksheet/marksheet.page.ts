import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WebService} from '../services/web.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Platform, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-marksheet',
  templateUrl: './marksheet.page.html',
  styleUrls: ['./marksheet.page.scss'],
})
export class MarksheetPage implements OnInit {
  // authenticated = false;
  message = '';
  marksheetData: Observable<any>;
  pageIndex = 1;
  maxPageIndex = 1;
  // GET_MARKSHEET_URL = '  https://ccbst.ccbst.org/api/v1/marksheet'
  GET_MARKSHEET_URL = 'https://ccbst.ccbst.org/api/v1/marksheet'
  // https://ccbst.ccbst.org/api/v1/marksheet

  constructor(
    private pltfrm: Platform,
    private storage: Storage,
    private WebService: WebService,
    private http: HttpClient, 
    public toastController: ToastController,
    private zone: NgZone
  ) { 
    // this.getMarksheet();

  }

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.getMarksheet(this.pageIndex);
}
  ngOnInit() {
    // this.getMarksheet();
  }

  prevBtnClicked(){

    if(this.pageIndex == 1 || this.pageIndex < 1){
      this.pageIndex = 1;
    }else{
      this.pageIndex = this.pageIndex - 1;
      this.getMarksheet(this.pageIndex);
    }
  }

  nextBtnClicked(){
    if(this.pageIndex < this.maxPageIndex) {
          this.pageIndex = this.pageIndex + 1;
          this.getMarksheet(this.pageIndex);
  }
}

  getMarksheet(updatedPageIndex){
    var authToken = "";
    this.storage.get('AUTH_TOKEN').then((token) => {
      console.log('Raw Auth token?', token);

      authToken = "Bearer " + token;
      // this.http.get(this.GET_MARKSHEET_URL).subscribe(res => {
      //   this.message = res['results'][0].name;
      // });
  
      // this.pltfrm.is('cordova') ? this.WebService.getNativeMarksheetData(authToken) : this.WebService.getStandardMarksheetData(authToken);
      this.WebService.getMarksheetData(authToken, updatedPageIndex)
      
      .subscribe((data: any[])=>{

        console.log("WebService.getMarksheetData");
        console.log("response::",data);
        // let result = data['result'];
        let marksheet_list = data['marksheet_list'];
        this.maxPageIndex = marksheet_list['last_page'];
        console.log("marksheet_list::",marksheet_list);
        
        this.zone.run(() => {
          console.log('force update the screen');
          this.marksheetData = marksheet_list['data'];
        });

        // temp = marksheetData[0];
        // tempModule = temp["name"];
        // this.presentToast(data["message"]);
        });
      }, error => {
          console.log(error);
          console.log("WebService.getMarksheetData error");
          this.presentToast(error);
      });
    }
  }

