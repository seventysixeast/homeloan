import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  loggedInUser = new Subject<any>();
  constructor(private http: HttpClient) {
    // let user = JSON.parse(atob(localStorage.getItem('admin')));
    // this.loggedInUser.next(user)
  }

  // baseurl = 'https://www.acramm.com/homeloan/admin/Api.php';
  // mediaUrl = 'https://www.acramm.com/homeloan/admin/uploads/';

  // baseurl = 'http://localhost/Harman/Surinder/HomeLoan/admin/Api.php';
  // mediaUrl = 'http://localhost/Harman/Surinder/HomeLoan/admin/uploads/';
  // loggedInUser = new Subject<any>();

  // console.log()

  // baseurl = 'http://localhost/homeloan/admin/Api.php';
  // mediaUrl = 'http://localhost/homeloan/admin/uploads/';
  baseurl = 'http://localhost/29nov/homeloan/admin/Api.php';
  mediaUrl = 'http://localhost/29nov/homeloan/admin/uploads/';

  // baseurl = 'https://76east.com/retailloan/admin/Api.php';
  // mediaUrl = 'https://76east.com/retailloan/admin/uploads/'; 

  // baseurl = 'http://localhost/28nov/homeloan/admin/Api.php';
  // mediaUrl = 'http://localhost/28nov/homeloan/admin/uploads/';

  //baseurl = 'https://76east.com/homeloan_server/admin/Api.php';
  //mediaUrl = 'https://76east.com/homeloan_server/admin/uploads/'; 


  userLoggedIn() {
    let user: any;
    if (localStorage.getItem('admin')) {
      user = localStorage.getItem('admin')
      // console.log('user', atob(user))
      // localStorage.setItem('admin',response)
    } else if (localStorage.getItem('creditApprover')) {
      user = localStorage.getItem('creditApprover')
      // user = JSON.parse(atob(user));
      // return user;

    } else if (localStorage.getItem('creditAnalyst')) {
      user = localStorage.getItem('creditAnalyst')
    } else if (localStorage.getItem('creditUnderwriter')) {
      user = localStorage.getItem('creditUnderwriter')
    }
    // console.log('user',user)
    if(user){
      user = JSON.parse(atob(user));
    }
    return user;
  }

  userLogin(data: any) {
    this.loggedInUser.next(data)
  }

  getAppDataList(data: any) {
    return this.http.post(this.baseurl, data);
  }

  submitAppData(data: any) {
    return this.http.post(this.baseurl, data);
  }

  getUser(data: any) {
    return this.http.post(this.baseurl, data);
  }
  addStatus(logedInUser: any, userId: any, status: any) {
    // let data = new FormData();
    // console.log('logedInUser.type', logedInUser.type)
    if (logedInUser.type == "Credit-Analyst") {
      return ("Processing by Credit Analyst(" + logedInUser.f_name + ")");
    } else if (logedInUser.type == "Credit-Underwriter") {
      return ("Reveiwing by Credit Underwriter(" + logedInUser.f_name + ")");
    } else if (logedInUser.type == "Credit-Approver") {
      return "Reveiwing by Credit Approver(" + logedInUser.f_name + ")";
    } else if (logedInUser.type == "Admin" && (status.indexOf("Reveiwing by Admin") > -1)) {
      return "Reveiwing by Admin";
    } else if (logedInUser.type == "Admin" && ((status.indexOf("Processing by Admin") > -1))) {
      return "Processing by Admin";
    }

    // else if(logedInUser.type == "Admin" && userId != '' && parseInt(logedInUser.id) != parseInt(userId)){
    //   return "Reveiwing by Admin";
    // }else if(logedInUser.type == "Admin" && userId == ''){
    //   return "Processing by Admin";
    // }
    return null;
  }

}
