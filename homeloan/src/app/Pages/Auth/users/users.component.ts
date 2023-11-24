import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavComponent } from 'src/app/Components/side-nav/side-nav.component';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [SideNavComponent],
})
export class UsersComponent {
  constructor(
    private ds: DataService,
    private router: Router,
    private sideNav: SideNavComponent
  ) {}

  dataList: any = [];
  logedInUser : any;

  ngOnInit(): void {
    this.getData();
    this.logedInUser = this.ds.userLoggedIn()
    console.log('this.logedInUser',this.logedInUser)
  }

  getData() {
    let data = new FormData();
    data.append('action', 'getUsers');
    //data.append('userId', this.logedInUser.id);
    this.ds.getAppDataList(data).subscribe((response: any) => {
      this.dataList = response;
      console.log(response);
    });
  }

  openData(id: any) {
    console.log(id);
    this.router.navigateByUrl('user-update/' + id);
    // localStorage.setItem('activeId', id);
    // this.sideNav.openPage(1, 1);
    // // this.router.navigateByUrl('applicant-data/' + id);
    // window.location.href = 'applicant-data/' + id;
  }

  deleteAcc(id: any) {
    console.log(id);
    let data = new FormData();
    data.append('action', 'deleteUser');
    data.append('id', id);
    this.ds.getAppDataList(data).subscribe((response: any) => {
      console.log(response);
      this.getData();
    });
  }
}
