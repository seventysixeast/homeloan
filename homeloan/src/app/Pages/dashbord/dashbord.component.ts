import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  logedInUser : any;

  ngOnInit(): void {
    localStorage.removeItem("mId");
    localStorage.removeItem("smId");
    localStorage.removeItem("applicant1Id");
    localStorage.removeItem("activeId");
    localStorage.removeItem("application_no");
    this.logedInUser = this.ds.userLoggedIn()
    this.getData();
    console.log('this.logedInUser',this.logedInUser)
    
  }

  getData() {
    let data = new FormData();
    data.append('action', 'getAppDataList');
    if(this.logedInUser.type == "Credit-Analyst" ){
      data.append('userId', this.logedInUser.id);
      data.append('type', "Credit-Analyst");
    }else if(this.logedInUser.type == "Credit-Underwriter"){
      data.append('userId', "0");
      data.append('type', "Credit-Underwriter");
    }else if(this.logedInUser.type == "Credit-Approver"){
      data.append('userId', "0");
      data.append('type', "Credit-Approver");
    }else if(this.logedInUser.type == "Admin"){
      data.append('userId', "0");
      data.append('type', "Admin");
    }
    // data.append('viewByAdmin', "Admin");
    this.ds.getAppDataList(data).subscribe((response: any) => {
      this.dataList = response;
    });
    console.log('check123')
    // this.sideNav.openPage(Number(null), Number(null));
  }

  openData(id: any) {
    localStorage.setItem('activeId', id);
    console.log('check')
    this.sideNav.openPage(1, 1);
    // this.router.navigateByUrl('applicant-data/' + id);
    window.location.href = 'applicant-data/' + id;
  }

  editData(id: any) {
    localStorage.setItem('activeId', id);
    console.log('check')
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

  displayStatus(status: any){
    if(this.logedInUser.type == "Credit-Underwriter"){
      if(status.indexOf("Submitted by Credit Analyst") > -1){
        console.log('htti')
        return "badge bg-success";
      }else if(status.indexOf("Processing by Credit Analyst") > -1){
        return "badge bg-warning";
      }
    }
    if(this.logedInUser.type == "Credit-Analyst"){
      if(status.indexOf("Submitted by Credit Analyst") > -1){
        console.log('htti')
        return "badge bg-success";
      }else if(status.indexOf("Processing by Credit Analyst") > -1 || status.indexOf("Reveiwing by Credit Underwriter") > -1){
        return "badge bg-warning";
      }
    }
    return "";
  }

  notShowingEditoption(status: any){
    if(this.logedInUser.type == "Credit-Underwriter"){
      if((status.indexOf("Submitted by Credit Analyst") > -1) || status.indexOf("Reveiwing by Credit Underwriter") > -1){
        // console.log('htti')
        return "bx bxs-edit-alt";
      }else if(status.indexOf("Processing by Credit Analyst") > -1){
        return "bx bxs-edit-alt notShowEdit";
      }
    }
    if(this.logedInUser.type == "Credit-Analyst"){
      if(status.indexOf("Submitted by Credit Analyst") > -1 || status.indexOf("Reveiwing by Credit Underwriter") > -1){
        console.log('htti')
        return "bx bxs-show";
      }else if(status.indexOf("Processing by Credit Analyst") > -1 ){
        return "bx bxs-edit-alt notShowEdit";
      }

      // return "bx bxs-edit-alt notShowEdit";
    }
    return "";
  }

  notShowingViewOption(status: any){
    console.log('status',status)
    if(this.logedInUser.type == "Credit-Underwriter"){
      if(status.indexOf("Submitted by Credit Analyst") > -1){
        console.log('htti')
        return "badge bg-success";
      }else if(status.indexOf("Processing by Credit Analyst") > -1){
        return "badge bg-warning";
      }
    }
    if(this.logedInUser.type == "Credit-Analyst"){
      if(status.indexOf("Submitted by Credit Analyst") > -1 || status.indexOf("Reveiwing by Credit Underwriter") > -1){
        console.log('htti')
        return "bx bxs-show";
      }else if(status.indexOf("Processing by Credit Analyst") > -1 ){
        return "bx bxs-show notShowEdit";
      }
    }
    return "";
  }

  
}
