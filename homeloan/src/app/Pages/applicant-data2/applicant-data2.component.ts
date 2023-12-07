import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';

@Component({
  selector: 'app-applicant-data2',
  templateUrl: './applicant-data2.component.html',
  styleUrls: ['./applicant-data2.component.css'],
  providers: [SideNavComponent],
})
export class ApplicantData2Component {
  constructor(
    public ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sideNav: SideNavComponent
  ) {}

  openId: any = 0;
  openData: any = [];

  a1_name = '';
  a1_fName = '';
  a1_activity = '';
  a1_paddress = '';
  a1_age = '';
  a1_nrc = '';
  a1_phone = '';
  a1_passport = '';
  a1_photo: any = '';
  a1_photo_data: any;

  a2_name = '';
  a2_fName = '';
  a2_activity = '';
  a2_paddress = '';
  a2_age = '';
  a2_nrc = '';
  a2_phone = '';
  a2_passport = '';
  a2_photo: any = '';
  a2_photo_data: any;

  app_date = '';

  openType = 'new';
  application_no: any;
  logedInUser : any;
  submittedBy = "";
  userId = "";
  status = "";
  viewOnly: any = false;
  nextButtonText: any = "";

  ngOnInit(): void {
    this.application_no = localStorage.getItem('application_no');
    this.route.params.subscribe((params: any) => {
      if(params.id != null){
        this.openId = params.id;
        localStorage.setItem("applicant1Id",params.id)
        if (this.openId != 0) {
          this.getSingleData();
        }
      }
    });
    this.logedInUser = this.ds.userLoggedIn()
    let checkView = localStorage.getItem("viewOnly")
    // checkView =  JSON.parse(checkView)
    console.log('checkView',checkView)
    if(checkView === 'true'){
      this.viewOnly =  true;
      this.nextButtonText = "Next"
    }else{
      this.nextButtonText = "Save And Next"
    }
  }

  getSingleData() {
    let data = new FormData();

    data.append('id', this.openId);
    data.append('action', 'getSingleData');

    this.ds.submitAppData(data).subscribe((response: any) => {
      if (response != null) {
        this.a1_name = response[0].a1_name;
        this.a1_fName = response[0].a1_fName;
        this.a1_activity = response[0].a1_activity;
        this.a1_paddress = response[0].a1_paddress;
        this.a1_age = response[0].a1_age;
        this.a1_nrc = response[0].a1_nrc;
        this.a1_phone = response[0].a1_phone;
        this.a1_passport = response[0].a1_passport;
        this.a1_photo = this.ds.mediaUrl + response[0].a1_photo;

        this.a2_name = response[0].a2_name;
        this.a2_fName = response[0].a2_fName;
        this.a2_activity = response[0].a2_activity;
        this.a2_paddress = response[0].a2_paddress;
        this.a2_age = response[0].a2_age;
        this.a2_nrc = response[0].a2_nrc;
        this.a2_phone = response[0].a2_phone;
        this.a2_passport = response[0].a2_passport;
        this.a2_photo = this.ds.mediaUrl + response[0].a2_photo;

        this.app_date = response[0].app_date;
        this.openType = 'old';
        this.submittedBy = response[0].submittedBy;
        this.userId = response[0].userId;
        this.status = response[0].status;
      }
    });
  }

  handleFileInput(files: any, no: number) {
    if (no == 1) {
      this.a1_photo_data = files.files.item(0);

      if (files.files && files.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(files.files[0]); // read file as data url
        reader.onload = (event: any) => {
          // called once readAsDataURL is completed
          this.a1_photo = event.target.result;
        };
      }
    }
    if (no == 2) {
      this.a2_photo_data = files.files.item(0);

      if (files.files && files.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(files.files[0]); // read file as data url
        reader.onload = (event: any) => {
          // called once readAsDataURL is completed
          this.a2_photo = event.target.result;
        };
      }
    }
  }

  handleSubmit(no: number) {
    console.log('a2_name',this.a2_name)
    console.log('this.viewOnly',this.viewOnly)
    if(this.viewOnly){
      this.goNext();
      return;
    }
    // return;
    if(!this.viewOnly){
      // if(this.a2_name == ''){
      //   alert('Applicant Full Name Is Required')
      //   return;
      // }
      this.spinner.show();
      let data = new FormData();
      data.append('id', this.openId == undefined ? 0 : this.openId);
  
  
  
      // let application_no = localStorage.getItem('application_no');
      if(this.logedInUser.type == "Credit-Analyst"){
        data.append('submittedBy', "Credit-Analyst");
        data.append('userId', this.logedInUser.id);
        data.append('status', "Processing by Credit Analyst("+this.logedInUser.f_name +")");
      }else if(this.logedInUser.type == "Credit-Underwriter"){
        data.append('submittedBy', this.submittedBy);
        data.append('userId', this.userId);
        data.append('status', "Reveiwing by Credit Underwriter("+this.logedInUser.f_name  +")");
      }else if(this.logedInUser.type == "Credit-Approver"){
        data.append('submittedBy', this.submittedBy);
        data.append('userId', this.userId);
        data.append('status', "Reveiwing by Credit Approver("+this.logedInUser.f_name +")");
      }else if(this.logedInUser.type == "Admin" && (this.status.indexOf("Reveiwing by Admin") > -1)){
        data.append('submittedBy', this.submittedBy);
        data.append('userId', this.userId);
        data.append('status', "Reveiwing by Admin");
      }else if(this.logedInUser.type == "Admin" && (this.status.indexOf("Processing by Admin") > -1)){
        data.append('submittedBy', "Admin");
        data.append('userId', this.logedInUser.id);
        data.append('status', "Processing by Admin");
      }
      data.append('application_no',this.application_no);
      data.append('applicant_type', "applicant2");
      // data.append('status', "applicant2");
      data.append('a1_name', this.a1_name);
      data.append('openType', this.openType);
      data.append('a1_fName', this.a1_fName);
      data.append('a1_activity', this.a1_activity);
      data.append('a1_paddress', this.a1_paddress);
      data.append('a1_age', this.a1_age);
      data.append('a1_nrc', this.a1_nrc);
      data.append('a1_phone', this.a1_phone);
      data.append('a1_passport', this.a1_passport);
      data.append('a1_photo', this.a1_photo_data);
      data.append('a2_name', this.a2_name);
      data.append('a2_fName', this.a2_fName);
      data.append('a2_activity', this.a2_activity);
      data.append('a2_paddress', this.a2_paddress);
      data.append('a2_age', this.a2_age);
      data.append('a2_nrc', this.a2_nrc);
      data.append('a2_phone', this.a2_phone);
      data.append('a2_passport', this.a2_passport);
      data.append('a2_photo', this.a2_photo_data);
      data.append('app_date', this.app_date);
      data.append('action', 'submit-app-data');
      this.ds.submitAppData(data).subscribe((response: any) => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        if (no == 1) {
          // let div2: any = document.getElementById('profile-tab');
          // div2.click();
          // window.scroll({
          //   top: 0,
          //   left: 0,
          //   behavior: 'smooth',
          // });
          // this.router.navigateByUrl('dashbord');
        }
        this.spinner.hide();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
        // window.location.reload();
        this.goNext();
      });
    }
  }

  showApp1() {
    let div2: any = document.getElementById('home-tab');
    div2.click();
  }

  showApp2() {
    let div2: any = document.getElementById('profile-tab');
    div2.click();
  }

  goNext() {
    // this.router.navigateByUrl('guarantor-data/' + this.openId);
    this.sideNav.openPage(1, 2);
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

  goBack() {
    // this.router.navigateByUrl('applicant-data/' + this.openId);
    this.sideNav.openPage(1, 1);
  }
}
