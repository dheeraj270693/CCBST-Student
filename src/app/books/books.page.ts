import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  BOOK_URL = "https://ccbst.ccbst.org/student/books";

  constructor(
    private browser: InAppBrowser,

  ) { }

  ngOnInit() {
    this.openInAppBrowser();
  }

  openInAppBrowser(){
    this.browser.create(this.BOOK_URL,'_self');
  }

}
