import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators'
// import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WebService {
  message = '';

  constructor(
    private loadingCtrl: LoadingController,
    public httpClient: HttpClient,
    private http: HTTP,
  ) { }
  // https://ccbst.ccbst.org/api/v1/marksheet
  BASE_URL = 'https://ccbst.ccbst.org/api/v1/'
  GET_MARKSHEET_URL = this.BASE_URL +'marksheet'

  // GET_MARKSHEET_URL = 'https://ccbst.ccbst.org/api/v1/marksheet/page=2'
  POST_LOGIN_URL = 'https://ccbst.ccbst.org/api/v1/login'
  POST_REFERRAL_URL = 'https://ccbst.ccbst.org/api/v1/referral-student'
  GET_ASSIGNMENT_URL = this.BASE_URL +'assignments'
  // API_KEY = '5449e7eb0bfe4288a576acf1413326cf'
  // password:'BC136012019141'


  loginPostData(loginParams) {

    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'application/json');
    headers.append('content-type', 'application/json');

    return this.httpClient.post(this.POST_LOGIN_URL, loginParams, { headers: headers })
  }

  getMarksheetData(authToken, pageNumber) {
  // ND8707201901
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
      // .set('Access-Control-Max-Age', '3600')
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .set('Authorization', authToken)

    return this.httpClient.get(this.GET_MARKSHEET_URL+'?page='+pageNumber, { headers: headers })
  }

  getAssignmentData(authToken, pageNumber) {
    // BD10407201907
      const headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
        .set('Accept', 'application/json')
        .set('content-type', 'application/json')
        .set('Authorization', authToken)
  
      return this.httpClient.get(this.GET_ASSIGNMENT_URL+'?page='+pageNumber, { headers: headers })
    }

  postReferralData(referralParams, authToken) {
    const referralHeader = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
      // .set('Access-Control-Max-Age', '3600')
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .set('Authorization', authToken)

    return this.httpClient.post(this.POST_REFERRAL_URL, referralParams, { headers: referralHeader })

  }

  /*
  async getStandardMarksheetData(authToken) {
    // ND8707201901
    let loading = await this.loadingCtrl.create();
    await loading.present();

    // var headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Headers', '*');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('Accept', 'application/json');
    // headers.append('content-type', 'application/json');
    // headers.append('Authorization', authToken);

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Authorization', authToken);

    console.log("headers::", headers);

    // headers.append('Authorization',authToken);

    // const headers = new HttpHeaders()
    // .set('Access-Control-Allow-Origin', '*')
    // // .set('Access-Control-Allow-Origin' , 'http://localhost:8105')
    // .set('Access-Control-Allow-Headers', '*')
    // .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
    // .set('Access-Control-Max-Age', '3600')
    // .set('Accept', 'application/json, text/plain')
    // .set('content-type', 'application/json')
    // .set('Authorization', authToken)

    this.httpClient.get(this.GET_MARKSHEET_URL, { headers: headers })
      .pipe(
        finalize(() => loading.dismiss())
      )
      .subscribe(data => {
        console.log("Marksheet Data: ", data);
      }, err => {
        console.log("Marksheet Error: ", err);
      });
  }


  async getNativeMarksheetData(authToken) {
    // ND8707201901
    let loading = await this.loadingCtrl.create();
    await loading.present();

var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'application/json');
    headers.append('content-type', 'application/json');

    // headers.append('Authorization',authToken);

    // const headers = new HttpHeaders()
    // .set('Access-Control-Allow-Origin', '*')
    // .set('Access-Control-Allow-Headers', '*')
    // .set('Access-Control-Allow-Origin' , 'http://localhost:8105')
    // // .set('Access-Control-Allow-Origin', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization')
    // .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
    // .set('Access-Control-Max-Age', '3600')
    // .set('Accept', 'application/json')
    // .set('content-type', 'application/json')
    // .set('Authorization', authToken)

    let nativeCall = this.http.get(this.GET_MARKSHEET_URL, {}, { headers: headers });
    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
      .subscribe(data => {
        console.log("Marksheet Data: ", data);
      }, err => {
        console.log("Marksheet Error: ", err);
      });

  }
  */

}
