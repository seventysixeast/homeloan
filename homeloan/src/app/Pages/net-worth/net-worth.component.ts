import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';

@Component({
  selector: 'app-net-worth',
  templateUrl: './net-worth.component.html',
  styleUrls: ['./net-worth.component.css'],
  providers: [SideNavComponent],
})
export class NetWorthComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sideNav: SideNavComponent
  ) {}

  openId: any = 0;

  c_loanAmount = 0;
  c_intrestRate = 14;
  c_months = 60;
  c_emi = 0;

  ammountPEMI: any = 0;
  EMI1: any = '';
  EMI2: any = '';
  IIR1: any = '';
  IIR2: any = '';
  netWorth1: any = '';
  netWorth2: any = '';
  totalNetWorth: any = 0;
  loanAmmount: any = 0;
  loanAmountRatio: any = 0;

  logedInUser : any;
  userId = "";
  status = "";
  viewOnly: any = false;
  nextButtonText: any = "";

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log('params.id',params.id)
      this.openId = params.id;
      localStorage.setItem("applicant1Id",params.id)
      if (this.openId != 0) {
        this.getSingleData();
        this.getSingleAppData()
      }
    });
    // console.log('this.openId',this.openId)
    this.logedInUser = this.ds.userLoggedIn()
    console.log('this.logedInUser',this.logedInUser)
    let checkView = localStorage.getItem("viewOnly")
    // checkView =  JSON.parse(checkView)
    // console.log('checkView',checkView)
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
    data.append('action', 'getSingleDataLoan');

    this.ds.submitAppData(data).subscribe((response: any) => {
      let data2 = new FormData();
      data2.append('id', this.openId);
      data2.append('action', 'getSingleNetWorth');
      this.ds.submitAppData(data2).subscribe((response2: any) => {
        this.loanAmmount = response[response.length - 1].loanRequest;
        this.c_loanAmount = response[response.length - 1].loanRequest;
        this.updateTotal();

        let result2 = response2[response2.length - 1];

        this.c_loanAmount = result2.c_loanAmount;
        this.c_intrestRate = result2.c_intrestRate;
        this.c_months = result2.c_months;
        this.c_emi = result2.c_emi;

        this.ammountPEMI = this.c_emi;
        this.EMI1 = result2.EMI1;
        this.EMI2 = result2.EMI2;
        this.IIR1 = result2.IIR1;
        this.IIR2 = result2.IIR2;
        this.netWorth1 = result2.netWorth1;
        this.netWorth2 = result2.netWorth2;
        this.totalNetWorth = result2.totalNetWorth;
        this.loanAmmount = result2.loanAmmount;
        this.loanAmountRatio = result2.loanAmountRatio;
      });
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

  handleSubmit() {
    if(this.viewOnly){
      this.goNext();
      return;
    }
    this.spinner.show();
    let data: any = new FormData();

    data.append('action', 'submit-net-worth');
    
    if(this.logedInUser.type == "Credit-Analyst"){
      data.append('status', "Processing by Credit Analyst("+this.logedInUser.f_name +")");
    }else if(this.logedInUser.type == "Credit-Underwriter"){
      data.append('status', "Reveiwing by Credit Underwriter("+this.logedInUser.f_name  +")");
    }else if(this.logedInUser.type == "Credit-Approver"){
      data.append('status', "Reveiwing by Credit Approver("+this.logedInUser.f_name +")");
    }else if(this.logedInUser.type == "Admin" && this.userId != '' && parseInt(this.logedInUser.id) != parseInt(this.userId)){
      data.append('status', "Reveiwing by Admin");
    }else if(this.logedInUser.type == "Admin" && this.userId == ''){
      data.append('status', "Processing by Admin");
    }

    data.append('ref_id', this.openId);
    data.append('c_loanAmount', this.c_loanAmount);
    data.append('c_intrestRate', this.c_intrestRate);
    data.append('c_months', this.c_months);
    data.append('c_emi', this.c_emi);

    data.append('ammountPEMI', this.c_emi);
    data.append('EMI1', this.EMI1);
    data.append('EMI2', this.EMI2);
    data.append('IIR1', this.IIR1);
    data.append('IIR2', this.IIR2);
    data.append('netWorth1', this.netWorth1);
    data.append('netWorth2', this.netWorth2);
    data.append('totalNetWorth', this.totalNetWorth);
    data.append('loanAmmount', this.loanAmmount);
    data.append('loanAmountRatio', this.loanAmountRatio);
    // data.append('status', "net-worth");

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
      console.log(response);
    });
  }

  goNext() {
    // this.router.navigateByUrl('client-vist/' + this.openId);
    this.sideNav.openPage(2, 2);
  }

  pmt(rate: any, nperiod: any, pv: any, fv: any, type: any) {
    if (!fv) fv = 0;
    if (!type) type = 0;

    if (rate == 0) return -(pv + fv) / nperiod;

    var pvif = Math.pow(1 + rate, nperiod);
    var pmt = (rate / (pvif - 1)) * (pv * pvif + fv);

    if (type == 1) {
      pmt /= 1 + rate;
    }

    return pmt;
  }

  updateTotal() {
    console.log('ok');
    let result: any = this.pmt(
      this.c_intrestRate / 12 / 100,
      this.c_months,
      this.c_loanAmount,
      0,
      0
    );
    this.c_emi = Math.round(result);

    this.IIR1 = (this.EMI1 == '' ? 0 : this.EMI1) / this.c_emi;
    this.IIR1 = this.IIR1.toFixed(2);
    this.IIR2 = (this.EMI2 == '' ? 0 : this.EMI2) / this.c_emi;
    this.IIR2 = this.IIR2.toFixed(2);

    this.totalNetWorth =
      parseInt(this.netWorth1 == '' ? 0 : this.netWorth1) +
      parseInt(this.netWorth2 == '' ? 0 : this.netWorth2);

    //this.loanAmountRatio = this.totalNetWorth / this.loanAmmount;
    this.loanAmountRatio = (this.totalNetWorth / this.loanAmmount).toFixed(2); //fixed the decimal upto 2
  }

  goBack() {
    // this.router.navigateByUrl('loan-request/' + this.openId);
    this.sideNav.openPage(1, 3);
  }
}
