import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WebService} from '../services/web.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Platform, LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.page.html',
  styleUrls: ['./assignment.page.scss'],
})
export class AssignmentPage implements OnInit {
  pageIndex = 1;
  maxPageIndex = 1;
  message = '';
  assignmentData: Observable<any>;

  constructor(
    private storage: Storage,
    private WebService: WebService,
    private http: HttpClient, 
    public toastController: ToastController,
    private zone: NgZone,
    private browser: InAppBrowser,

  ) { }

  ionViewWillEnter() {
    this.getAssignment(this.pageIndex);
}
  ngOnInit() {
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

  openUrl(url){
    this.browser.create(url,'_self');
  }

  prevBtnClicked(){

    if(this.pageIndex == 1 || this.pageIndex < 1){
      this.pageIndex = 1;
    }else{
      this.pageIndex = this.pageIndex - 1;
      this.getAssignment(this.pageIndex);
    }
  }

  nextBtnClicked(){
    if(this.pageIndex < this.maxPageIndex) {
          this.pageIndex = this.pageIndex + 1;
          this.getAssignment(this.pageIndex);
  }
}

  getAssignment(updatedPageIndex){
    var authToken = "";
    // var marksheetData = [{}];
    this.storage.get('AUTH_TOKEN').then((token) => {
      console.log('Raw Auth token?', token);

      authToken = "Bearer " + token;
      // this.http.get(this.GET_MARKSHEET_URL).subscribe(res => {
      //   this.message = res['results'][0].name;
      // });
  
      // this.pltfrm.is('cordova') ? this.WebService.getNativeMarksheetData(authToken) : this.WebService.getStandardMarksheetData(authToken);
      this.WebService.getAssignmentData(authToken, updatedPageIndex)
      
      .subscribe((data)=>{

        console.log("WebService.getAssignmentData");
        console.log("response::",data);
        // let result = data['result'];
        let assignment_list = data['assignment_list'];
        
        this.zone.run(() => {
          console.log('force update the screen');
          this.assignmentData = assignment_list['data'];
          console.log("assignmentData::",this.assignmentData);
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
