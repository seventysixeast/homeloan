import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavComponent } from 'src/app/Components/side-nav/side-nav.component';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';

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
  ) { }

  dataList: any = [];
  logedInUser: any;

  ngOnInit(): void {
    localStorage.removeItem("mId");
    localStorage.removeItem("smId");
    localStorage.removeItem("applicant1Id");
    localStorage.removeItem("activeId");
    localStorage.removeItem("application_no");
    localStorage.removeItem("viewOnly");
    this.getData();
    this.logedInUser = this.ds.userLoggedIn()
    // console.log('this.logedInUser', this.logedInUser)
  }

  getData() {
    let data = new FormData();
    data.append('action', 'getUsers');
    // data.append('userId', this.logedInUser.id);
    this.ds.getAppDataList(data).subscribe((response: any) => {
      this.dataList = response;
    });
  }

  openData(id: any) {
    // console.log(id);
    this.router.navigateByUrl('homeloan/user-update/' + id);
    // localStorage.setItem('activeId', id);
    // this.sideNav.openPage(1, 1);
    // // this.router.navigateByUrl('applicant-data/' + id);
    // window.location.href = 'applicant-data/' + id;
  }

  deleteAcc(id: any) {
    // console.log(id);

    Swal.fire({
      title: 'Do you want to delete the user?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: 'Cancel',
      customClass: {
        actions: 'my-actions',
        // cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
        // return;
        let data = new FormData();
        data.append('action', 'deleteUser');
        data.append('id', id);
    
        this.ds.getAppDataList(data).subscribe((response: any) => {
          // console.log(response);
          if (response == 1) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'User Is Deleted Successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getData();
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'Something went wrong',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
