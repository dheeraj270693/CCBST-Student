// // import { AlertController } from 'ionic-angular';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';

// import { Observable } from 'rxjs';
// import { _throw } from 'rxjs/observable/throw';
// import { catchError, mergeMap } from 'rxjs/operators';
// import { from } from 'rxjs';
// import 'rxjs/add/observable/of';
// import { fromPromise } from 'rxjs/observable/fromPromise';

// // import 'rxjs/add/operator/fromPromise';
// // import 'rxjs/add/operator/map';
// // import { map } from 'rxjs/operators';

// @Injectable()
// //   {
// //   providedIn: 'root'
// // })
export class InterceptorService {
// implements HttpInterceptor {

  constructor(
//     private storage: Storage, 
//     // private alertCtrl: AlertController
    ) { }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     let promise = this.storage.get('authorization');
//     var observableFromPromise = fromPromise(promise);

//     return Observable.observableFromPromise
//         .mergeMap(token => {
//             let clonedReq = this.addToken(request, token);
//             return next.handle(clonedReq).pipe(
//                 catchError(error => {
//                     // Perhaps display an error for specific status codes here already?
//                     let msg = error.message;

//                     // let alert = this.alertCtrl.create({
//                     //     title: error.name,
//                     //     message: msg,
//                     //     buttons: ['OK']
//                     // });
//                     // alert.present();

//                     // Pass the error to the caller of the function
//                     return _throw(error);
//                 })
//             );
//         });
// }

// // Adds the token to your headers if it exists
// private addToken(request: HttpRequest<any>, token: any) {
//     if (token) {
//         let clone: HttpRequest<any>;
//         clone = request.clone({
//             setHeaders: {
//                 Accept: `application/json`,
//                 'Content-Type': `application/json`,
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return clone;
//     }

//     return request;
// }
}