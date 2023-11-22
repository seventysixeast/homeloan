import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css'],
  providers: [SideNavComponent],
})
export class LoanRequestComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sideNav: SideNavComponent
  ) {}

  openId: any = 0;

  am1: any = '';
  am2: any = '';
  am3: any = '';
  am4: any = '';
  am5: any = '';
  am6: any = '';
  am7: any = '';
  total: number = 0;

  d1: any = '';
  d2: any = '';
  d3: any = '';
  d4: any = '';
  d5: any = '';
  d6: any = '';
  d7: any = '';

  appMargin: any = '';
  appMarginD: any = '';

  // marginAge: number = 0;
  marginAge: string = "0";

  loanRequest: number = 0;
  loanRequestD: any = '';

  propertyD: any = '';
  comment: any = '';

  logedInUser : any;
  userId = "";
  status = "";

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.openId = params.id;
      if (this.openId != 0 && this.openId != null) {
        localStorage.setItem("applicant1Id",params.id)
        this.getSingleData();
        this.getSingleAppData()
      }
    });
    this.logedInUser = this.ds.userLoggedIn()
    console.log('this.logedInUser',this.logedInUser)

    this.updateTotal();
  }

  getSingleData() {
    let data = new FormData();

    data.append('id', this.openId);
    data.append('action', 'getSingleDataLoan');

    this.ds.submitAppData(data).subscribe((response: any) => {
      console.log('response',response)
      if (response != null) {
        let data = response[response.length - 1];
        let dataJson = JSON.parse(data.dataJson);
        console.log('dataJson',typeof dataJson[0].cost)
        this.am1 = dataJson[0].cost;
        this.d1 = dataJson[0].detail;

        this.am2 = dataJson[1].cost;
        this.d2 = dataJson[1].detail;

        this.am3 = dataJson[2].cost;
        this.d3 = dataJson[2].detail;

        this.am4 = dataJson[3].cost;
        this.d4 = dataJson[3].detail;

        this.am5 = dataJson[4].cost;
        this.d5 = dataJson[4].detail;

        this.am6 = dataJson[5].cost;
        this.d6 = dataJson[5].detail;

        this.am7 = (dataJson[6].cost);
        this.d7 = dataJson[6].detail;

        this.total = parseInt(data.total);
        this.appMargin = parseInt(data.appMargin);
        this.appMarginD = data.appMarginD;
        this.marginAge = (data.marginAge);
        this.loanRequest = parseInt(data.loanRequest);
        this.loanRequestD = data.loanRequestD;

        this.propertyD = data.propertyD;
        this.comment = data.comment;
      }
    });
  }

  getSingleAppData() {
    let data = new FormData();

    data.append('id', this.openId);
    data.append('action', 'getSingleData');

    this.ds.submitAppData(data).subscribe((response: any) => {
      if (response != null) {
        this.status = response[0].status;
        this.userId = response[0].userId;
      }
    });
  }

  updateTotal() {
    this.total =
      (this.am1 == '' ? 0 : this.am1) +
      (this.am2 == '' ? 0 : this.am2) +
      (this.am3 == '' ? 0 : this.am3) +
      (this.am4 == '' ? 0 : this.am4) +
      (this.am5 == '' ? 0 : this.am5) +
      (this.am6 == '' ? 0 : this.am6) +
      (this.am7 == '' ? 0 : this.am7);

    console.log(this.total);

    this.marginAge = ((this.appMargin / this.total) * 100).toFixed(2);

    this.loanRequest = this.total - this.appMargin;
  }

  handleSubmit() {
    this.spinner.show();
    let arr: any = [
      {
        id: 1,
        cost: this.am1,
        detail: this.d1,
      },
      {
        id: 2,
        cost: this.am2,
        detail: this.d2,
      },
      {
        id: 3,
        cost: this.am3,
        detail: this.d3,
      },
      {
        id: 4,
        cost: this.am4,
        detail: this.d4,
      },
      {
        id: 5,
        cost: this.am5,
        detail: this.d5,
      },
      {
        id: 6,
        cost: this.am6,
        detail: this.d6,
      },
      {
        id: 7,
        cost: this.am7,
        detail: this.d7,
      },
    ];

    console.log('this.marginAge',typeof this.marginAge)
    // return;
    let data: any = new FormData();

    // if(this.logedInUser.type == "Credit-Analyst"){
    //   data.append('status', "Processing by Credit Analyst("+this.logedInUser.f_name +")");
    // }else if(this.logedInUser.type == "Credit-Underwriter"){
    //   data.append('status', "Reveiwing by Credit Underwriter("+this.logedInUser.f_name  +")");
    // }else if(this.logedInUser.type == "Credit-Approver"){
    //   data.append('status', "Reveiwing by Credit Approver("+this.logedInUser.f_name +")");
    // }else if(this.logedInUser.type == "Admin" && this.userId != '' && parseInt(this.logedInUser.id) != parseInt(this.userId)){
    //   data.append('status', "Reveiwing by Admin");
    // }else if(this.logedInUser.type == "Admin" && this.userId == ''){
    //   data.append('status', "Processing by Admin");
    // }

    data.append('status', this.ds.addStatus(this.logedInUser, this.userId, this.status));
    data.append('ref_id', this.openId);
    data.append('dataJson', JSON.stringify(arr));
    data.append('total', this.total);
    data.append('appMargin', this.appMargin);
    data.append('appMarginD', this.appMarginD);
    // if(isNaN(this.marginAge)){
    //   data.append('marginAge', 0);
    // }else{
      data.append('marginAge', this.marginAge);
    // }
    data.append('loanRequest', this.loanRequest);
    data.append('loanRequestD', this.loanRequestD);
    data.append('propertyD', this.propertyD);
    data.append('comment', this.comment);
    data.append('action', 'submit-loan-request');
    // data.append('status', "loan-request");

    this.ds.submitAppData(data).subscribe((response: any) => {
      this.spinner.hide();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      this.goNext();
    });
  }

  goNext() {
    // this.router.navigateByUrl('net-worth/' + this.openId);
    this.sideNav.openPage(2, 1);
  }

  goBack() {
    this.sideNav.openPage(1, 12);
    // this.router.navigateByUrl('guarantor-data2/' + this.openId);
  }
}
