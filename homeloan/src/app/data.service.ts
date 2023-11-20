import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // baseurl = 'https://www.acramm.com/homeloan/admin/Api.php';
  // mediaUrl = 'https://www.acramm.com/homeloan/admin/uploads/';

  // baseurl = 'http://localhost/Harman/Surinder/HomeLoan/admin/Api.php';
  // mediaUrl = 'http://localhost/Harman/Surinder/HomeLoan/admin/uploads/';

  baseurl = 'http://localhost/homeloan/admin/Api.php';
  mediaUrl = 'http://localhost/homeloan/admin/uploads/';

  getAppDataList(data: any) {
    return this.http.post(this.baseurl, data);
  }

  submitAppData(data: any) {
    return this.http.post(this.baseurl, data);
  }

  getUser(data: any){
    return this.http.post(this.baseurl, data);
  }
}
