import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
  providers: [SideNavComponent],
})
export class DashbordComponent implements OnInit {
  constructor(
    private ds: DataService,
    private router: Router,
    private sideNav: SideNavComponent
  ) {}

  dataList: any = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let data = new FormData();
    data.append('action', 'getAppDataList');
    this.ds.getAppDataList(data).subscribe((response: any) => {
      this.dataList = response;
    });
  }

  openData(id: any) {
    localStorage.setItem('activeId', id);
    this.sideNav.openPage(1, 1);
    // this.router.navigateByUrl('applicant-data/' + id);
    window.location.href = 'applicant-data/' + id;
  }

  deleteAcc(id: any) {
    let data = new FormData();
    data.append('action', 'deleteAppDataList');
    data.append('id', id);
    this.ds.getAppDataList(data).subscribe((response: any) => {
      console.log(response);
      this.getData();
    });
  }
}
