import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';
import Swal from 'sweetalert2';

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
  ) { }

  dataList: any = [];
  logedInUser: any;
  addNewApplicationLink:any = "";
  url:any = ""; 
  ngOnInit(): void {
    localStorage.removeItem("mId");
    localStorage.removeItem("smId");
    localStorage.removeItem("applicant1Id");
    localStorage.removeItem("activeId");
    localStorage.removeItem("application_no");
    localStorage.removeItem("viewOnly");
    this.logedInUser = this.ds.userLoggedIn()
    this.getData();
    // console.log('this.logedInUser', this.logedInUser)

  }

  getData() {
    let data = new FormData();
    data.append('action', 'getAppDataList');
    this.url = this.ds.commonUrl(this.router);
   
    this.addNewApplicationLink = "/"+ this.url+"/applicant-data";
    if (this.logedInUser.type == "Credit-Analyst") {
      data.append('userId', this.logedInUser.id);
      data.append('type', "Credit-Analyst");
    } else if (this.logedInUser.type == "Credit-Underwriter") {
      data.append('userId', "0");
      data.append('type', "Credit-Underwriter");
    } else if (this.logedInUser.type == "Credit-Approver") {
      data.append('userId', "0");
      data.append('type', "Credit-Approver");
    } else if (this.logedInUser.type == "Admin") {
      data.append('userId', "0");
      data.append('type', "Admin");
    }
    data.append('loan_type', this.url);
    // data.append('viewByAdmin', "Admin");
    this.ds.getAppDataList(data).subscribe((response: any) => {
      console.log('response', response)
      this.dataList = response;
    });
    // console.log('check123')
    // this.sideNav.openPage(Number(null), Number(null));
  }

  openData(id: any, status: any) {
    localStorage.setItem('activeId', id);
    localStorage.setItem('viewOnly', "true")
    localStorage.setItem('applicant1Id', id)
    // if (this.logedInUser.type == "Credit-Approver" && status.indexOf("Approved by Credit Approver") == -1 && status.indexOf("Approved by Credit Approver") == -1 ) {
    if (this.logedInUser.type == "Credit-Approver" && (status.indexOf("Reveiwing by Credit Approver") > -1 || status.indexOf("Submitted by Admin") > -1)  ) {
      // console.log('status',status)
      // return;
      let data = new FormData();
      data.append('action', 'submit-all-forms');
      data.append('ref_id', id);
      data.append('status', "Reveiwing by Credit Approver(" + this.logedInUser.f_name + ")");
      this.ds.submitAppData(data).subscribe((response: any) => {
      });
      this.sideNav.openPage(2, 8);
      window.location.href = this.url+'/media-upload/' + id;

      return;
      // return  "Reveiwing by Credit Approver("+this.logedInUser.f_name +")";
    }
    // console.log('check')
    this.sideNav.openPage(1, 1);
    // this.router.navigateByUrl('applicant-data/' + id);
    window.location.href = this.url+'/applicant-data/' + id;
    // window.location.href = 'homeloan/homeloan/applicant-data/' + id;
  }

  editData(id: any) {
    localStorage.setItem('activeId', id);
    let data = new FormData();

    data.append('action', 'submit-all-forms');
    data.append('ref_id', id);
    if (this.logedInUser.type == "Credit-Analyst") {
      data.append('status', "Processing by Credit Analyst(" + this.logedInUser.f_name + ")");
    } else if (this.logedInUser.type == "Credit-Underwriter") {
      data.append('status', "Reveiwing by Credit Underwriter(" + this.logedInUser.f_name + ")");
    } else if (this.logedInUser.type == "Credit-Approver") {
      // data.append('action', 'submit-all-forms');
      // data.append('ref_id', this.openId);
      data.append('status', "Reveiwing by Credit Approver(" + this.logedInUser.f_name + ")");

      // return  "Reveiwing by Credit Approver("+this.logedInUser.f_name +")";
    } else if (this.logedInUser.type == "Admin") {
      // return "Reveiwing by Admin";
      data.append('status', "Reveiwing by Admin");
    }
    this.ds.submitAppData(data).subscribe((response: any) => {

      // console.log(response);
    });

    // console.log('check')
    this.sideNav.openPage(1, 1);
    // this.router.navigateByUrl('applicant-data/' + id);
    // window.location.href = 'homeloan/applicant-data/' + id;
    window.location.href = this.url+'/applicant-data/' + id;
  }

  deleteAcc(id: any) {

    Swal.fire({
      title: 'Do you want to delete the Application ?',
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
        data.append('action', 'deleteAppDataList');
        data.append('id', id);
        this.ds.getAppDataList(data).subscribe((response: any) => {
          // console.log("response",response);
          if(response == 1){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Application Is Deleted Successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getData();
          }else{
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
      }
    })
    
  }

  displayStatus(status: any) {
    if (status.indexOf("Approved by Credit Approver") > -1) {
      // console.log('htti')
      return "badge bg-success";
    } else if (status.indexOf("Approved by Credit Approver") > -1) {
      return "badge bg-danger";
    }
    if (this.logedInUser.type == "Credit-Underwriter") {
      if (status.indexOf("Submitted by Credit Analyst") > -1) {
        // console.log('htti')
        return "badge bg-success";
      } else if (status.indexOf("Processing by Credit Analyst") > -1 || status.indexOf("Reveiwing by Credit Underwriter") > -1) {
        return "badge bg-warning";
      }
    }
    if (this.logedInUser.type == "Credit-Analyst") {
      if (status.indexOf("Approved by Credit Approver") > -1) {
        // console.log('htti')
        return "badge bg-success";
      }
      // else if(status.indexOf("Processing by Credit Analyst") > -1 || status.indexOf("Reveiwing by Credit Underwriter") > -1){
      //   return "badge bg-warning";
      // }
    }

    if (this.logedInUser.type == "Admin") {
      // if(){
      return "badge bg-warning";
      // }
    }

    if (this.logedInUser.type == "Credit-Approver") {
      // if(){
      return "badge bg-warning";
      // }
    }
    return "badge bg-warning";
  }

  notShowingEditoption(status: any) {
    if (this.logedInUser.type == "Credit-Underwriter") {
      if ((status.indexOf("Submitted by Credit Analyst") > -1) || status.indexOf("Reveiwing by Credit Underwriter") > -1) {
        // console.log('htti')
        return "bx bxs-edit-alt";
      }
      // else 
      // if(status.indexOf("Processing by Credit Analyst") > -1){
      //   return "bx bxs-edit-alt notShowEdit";
      // }
    } else if (this.logedInUser.type == "Credit-Analyst") {
      // if(status.indexOf("Submitted by Credit Analyst") > -1 || status.indexOf("Reveiwing by Credit Underwriter") > -1){
      //   console.log('htti')
      //   return "bx bxs-edit-alt notShowEdit";
      // }
      // else 
      if (status.indexOf("Processing by Credit Analyst") > -1) {
        return "bx bxs-edit-alt";
      }

    } else if (this.logedInUser.type == "Admin") {
      // if(status.indexOf("Submitted by Credit Analyst") > -1 || status.indexOf("Reveiwing by Credit Underwriter") > -1 || status.indexOf("Processing by Credit Analyst") > -1){
      //   console.log('htti')
      //   return "bx bxs-edit-alt notShowEdit";
      // }
      // else 
      if (status.indexOf("Submitted by Credit Underwriter") > -1 || (status.indexOf("Reveiwing by Admin")) > -1) {
        return "bx bxs-edit-alt";
      }

    } else if (this.logedInUser.type == "Credit-Approver") {
      // if(status.indexOf("Submitted by Credit Analyst") > -1 || status.indexOf("Reveiwing by Credit Underwriter") > -1 || status.indexOf("Processing by Credit Analyst") > -1){
      //   console.log('htti')
      //   return "bx bxs-edit-alt notShowEdit";
      // }
      // else 
      // if(status.indexOf("Submitted by Admin") > -1 || (status.indexOf("Reveiwing by Credit Approver")) > -1 ){
      //   return "bx bxs-edit-alt";
      // }

    }
    return "bx bxs-edit-alt notShowEdit";
  }

  notShowingViewOption(status: any) {
    // console.log('status',status)
    if (this.logedInUser.type == "Credit-Underwriter") {
      // if(status.indexOf("Submitted by Credit Analyst") > -1){
      //   console.log('htti')
      //   return "bx bxs-show notShowEdit";
      // }else 
      if (status.indexOf("Reveiwing by Credit Underwriter") > -1 || status.indexOf("Submitted by Credit Analyst") > -1) {
        return "bx bxs-show notShowEdit";
      } else {
        return "bx bxs-show";
      }
    }
    if (this.logedInUser.type == "Credit-Analyst") {
      if (status.indexOf("Processing by Credit Analyst") > -1) {
        // console.log('htti')
        return "bx bxs-show notShowEdit";
      } else {
        return "bx bxs-show";
      }
      // else if(status.indexOf("Processing by Credit Analyst") > -1 ){
      //   return "bx bxs-show notShowEdit";
      // }
    }

    if (this.logedInUser.type == "Admin") {

      // if(status.indexOf("Submitted by Credit Analyst") > -1 || status.indexOf("Reveiwing by Credit Underwriter") > -1 || status.indexOf("Processing by Credit Analyst") > -1){
      //   console.log('htti')
      //   return "bx bxs-show";
      // }
      // else 
      if (status.indexOf("Processing by Admin") > -1 || (status.indexOf("Reveiwing by Admin") > -1) || (status.indexOf("Submitted by Credit Underwriter") > -1)) {
        return "bx bxs-show notShowEdit";
      } else {
        return "bx bxs-show";
      }

    }

    if (this.logedInUser.type == "Credit-Approver") {
      // if(status.indexOf("Submitted by Admin") > -1 || status.indexOf("Reveiwing by Credit Approver") > -1 ) {
      //   console.log('htti')
      //   return "bx bxs-show notShowEdit";
      // }else{
      // }
      // return "bx bxs-show";

      // else 
      // if(status.indexOf("Submitted by Credit Underwriter" || status.indexOf("Reveiwing by Admin")) > -1 ){
      //   return "bx bxs-show notShowEdit";
      // }else{
      // }
      return "bx bxs-show";

    }
    return "bx bxs-show notShowEdit";
  }

  notShowingDeleteOption(status: any) {
    // console.log('status',status)
    if (this.logedInUser.type == "Credit-Underwriter" || this.logedInUser.type == "Credit-Analyst" || this.logedInUser.type == "Credit-Approver") {
      // if(status.indexOf("Submitted by Credit Analyst") > -1){
      //   console.log('htti')
      //   return "bx bxs-show notShowEdit";
      // }else 
      if (status.indexOf("Approved by Credit Approver") > -1 ) {
        return "bx bxs-trash-alt mx-2 notShowEdit";
      } else {
        return "bx bxs-trash-alt mx-2";
      }
    }

    if (this.logedInUser.type == "Admin") {

      // if(status.indexOf("Submitted by Credit Analyst") > -1 || status.indexOf("Reveiwing by Credit Underwriter") > -1 || status.indexOf("Processing by Credit Analyst") > -1){
      //   console.log('htti')
      //   return "bx bxs-show";
      // }
      // else 
      // if (status.indexOf("Processing by Admin") > -1 || (status.indexOf("Reveiwing by Admin") > -1) || (status.indexOf("Submitted by Credit Underwriter") > -1)) {
      //   return "bx bxs-show notShowEdit";
      // } else {
        return "bx bxs-trash-alt mx-2";
      // }

    }
    return "bx bxs-trash-alt mx-2 notShowEdit";
  }


}
