import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private ds: DataService,
    private router: Router
  ) {}

  logedInUser : any;
  mediaUrl: string = '';
  imageShow: boolean =  false;

  ngOnInit(): void {
    this.logedInUser = this.ds.userLoggedIn();
    // console.log('this.logedInUser',this.logedInUser);
    this.mediaUrl = this.ds.mediaUrl;

    // console.log('if (this.router.url) {',this.router.url)
    if(this.router.url.includes('/retailloan-products')){
      this.imageShow = true;
    }else{
      this.imageShow = false;
    }
  }

  logout(){
    localStorage.clear()
    // this.router.navigateByUrl('/login');
    window.location.href = "/retailloan/login"

  }

}
