import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  customAlertOptions: any = {
    cssClass: 'my-alert',
    header: 'Category',
    // translucent: true
  };
  constructor() { }
  ngOnInit() {
  }
}
