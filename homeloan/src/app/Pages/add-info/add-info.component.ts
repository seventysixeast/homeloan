import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css'],
  providers: [SideNavComponent],
})
export class AddInfoComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private spiner: NgxSpinnerService,
    private sideNav: SideNavComponent
  ) {}

  openId: any = 0;

  bankName: any = "";
  branchName: any = "";
  irdm: any = "";
  loanNo: any = '';
  loandate: any = '';
  purposeLoan: any = '';
  roi: any = '';
  roia: any = '';
  moratorium: any = '';
  c_months: any = 0;
  EMI: any = 0;
  emiStatingMonth: any = '';
  terms: any = '';
  name1: any = '';
  designation1: any = '';
  name2: any = '';
  designation2: any = '';
  name3: any = '';
  designation3: any = '';
  guarantor: any = '';
  c_loanAmount: any = '';

  logedInUser : any;
  userId = "";
  status = "";

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if(params.id != null){
        localStorage.setItem("applicant1Id",params.id)
        this.openId = params.id;
        if (this.openId != 0) {
          this.getSingleData();
          this.getSingleAppData()
        }
      }
    });
    this.logedInUser = this.ds.userLoggedIn()
  }

  handleUpdate(value: number, type: number, no: number) {}

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
    let result: any = this.pmt(
      this.roi / 12 / 100,
      this.c_months,
      this.c_loanAmount,
      0,
      0
    );
    this.EMI = Math.round(result);
    console.log(this.EMI);
    // this.IIR1 = this.EMI1 / this.c_emi;
    // this.IIR1 = this.IIR1.toFixed(2);
    // this.IIR2 = this.EMI2 / this.c_emi;
    // this.IIR2 = this.IIR2.toFixed(2);
    // this.totalNetWorth = parseInt(this.netWorth1) + parseInt(this.netWorth2);
    // this.loanAmountRatio = this.totalNetWorth / this.loanAmmount;
  }

  getSingleData() {
    let data2 = new FormData();
    data2.append('id', this.openId);
    data2.append('action', 'getSingleDataLoan');
    this.ds.submitAppData(data2).subscribe((response2: any) => {
      if (response2.length != 0) {
        this.purposeLoan = response2[0].propertyD;
      }
    });

    let data = new FormData();
    data.append('id', this.openId);
    data.append('action', 'getSingleNetWorth');
    this.ds.submitAppData(data).subscribe((response: any) => {
      let data2 = new FormData();
      data2.append('id', this.openId);
      data2.append('action', 'getaddinfo');
      this.ds.submitAppData(data2).subscribe((response2: any) => {
        let result = response2[response2.length - 1];
        result = JSON.parse(result.JsonData);
        this.bankName = result.bankName;
        this.branchName = result.branchName;
        this.irdm = result.irdm;
        this.loanNo = result.loanNo;
        this.loandate = result.loandate;
        this.purposeLoan = result.purposeLoan;
        // this.roi = result.roi;
        this.roia = result.roia;
        this.moratorium = result.moratorium;
        this.emiStatingMonth = result.emiStatingMonth;
        this.terms = result.terms;
        this.name1 = result.name1;
        this.designation1 = result.designation1;
        this.name2 = result.name2;
        this.designation2 = result.designation2;
        this.name3 = result.name3;
        this.designation3 = result.designation3;
        this.guarantor = result.guarantor;
      });

      this.EMI = response[0].ammountPEMI;
      this.roi = response[0].c_intrestRate;
      this.c_months = response[0].c_months;
      this.c_loanAmount = response[0].c_loanAmount;
      this.EMI = response[0].c_emi;
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
    this.spiner.show();
    let JsonData = {
      bankName: this.bankName,
      branchName: this.branchName,
      irdm: this.irdm,
      loanNo: this.loanNo,
      loandate: this.loandate,
      purposeLoan: this.purposeLoan,
      roi: this.roi,
      roia: this.roia,
      moratorium: this.moratorium,
      noi: this.c_months,
      EMI: this.EMI,
      emiStatingMonth: this.emiStatingMonth,
      terms: this.terms,
      name1: this.name1,
      designation1: this.designation1,
      name2: this.name2,
      designation2: this.designation2,
      name3: this.name3,
      designation3: this.designation3,
      guarantor: this.guarantor,
    };

    let data: any = new FormData();

    data.append('action', 'submit-add-info');
    data.append('ref_id', this.openId);
    data.append('noi', this.c_months);
    data.append('EMI', this.EMI);
    data.append('JsonData', JSON.stringify(JsonData));
    // data.append('status', "add-info");
    data.append('status', this.ds.addStatus(this.logedInUser, this.userId, this.status));

    this.ds.submitAppData(data).subscribe((response: any) => {
      this.spiner.hide();

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      this.goNext();
      // console.log(response);
    });
  }

  goNext() {
    // this.router.navigateByUrl('media-upload/' + this.openId);
    this.sideNav.openPage(2, 8);
  }
  goBack() {
    // this.router.navigateByUrl('media-upload/' + this.openId);
    this.sideNav.openPage(2, 5);
  }
}
