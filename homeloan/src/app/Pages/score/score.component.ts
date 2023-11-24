import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
  providers: [SideNavComponent],
})
export class ScoreComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private spiner: NgxSpinnerService,
    private sideNav: SideNavComponent
  ) {}

  openId: any = 0;

  mws_total = 0;
  mws_total_old = 0;
  m_score: any = 0;
  total_score_end = 0;
  total_score_end2 = 0;
  safetyScore = '';

  c_loanAmount = 0;
  c_intrestRate = 0;
  c_months = 0;
  c_emi = 0;

  logedInUser : any;
  userId = "";
  status = "";
  viewOnly: any = false;
  nextButtonText: any = "";

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if(params.id != null){
        this.openId = params.id;
        if (this.openId != 0) {
          this.getSingleData();
          this.getSingleAppData()
        }
      }
    });
    this.logedInUser = this.ds.userLoggedIn()
    let checkView = localStorage.getItem("viewOnly")
    console.log('checkView',checkView)
    if(checkView === 'true'){
      this.viewOnly =  true;
      this.nextButtonText = "Next"
    }else{
      // this.nextButtonText = "Save And Next"
      if(this.logedInUser.type == "Credit-Underwriter"){
  
        this.nextButtonText = "Submit"
       
      }else if(this.logedInUser.type == "Credit-Approver"){
        // return  "Reveiwing by Credit Approver("+this.logedInUser.f_name +")";
        this.nextButtonText = "Save & Next"
      }else if(this.logedInUser.type == "Admin" && (status.indexOf("Reveiwing by Admin") > -1)){
        this.nextButtonText = "Save & Next"
        // return "Reveiwing by Admin";
      }

      // else if(this.logedInUser.type == "Credit-Underwriter"){
      //   this.nextButtonText = "Save & Next"
      // }
    }
  }

  getSingleData() {
    this.getNetworth();
    let data = new FormData();
    data.append('id', this.openId);
    data.append('action', 'getSinglerisk-2');
    this.ds.submitAppData(data).subscribe((response: any) => {
      let result2 = response[response.length - 1];
      result2 = JSON.parse(result2.JsonData);

      let data2 = new FormData();
      data2.append('id', this.openId);
      data2.append('action', 'getSinglerisk-1');
      this.ds.submitAppData(data2).subscribe((response2: any) => {
        let data3 = new FormData();
        data3.append('id', this.openId);
        data3.append('action', 'getScore');
        let result1 = response2[response2.length - 1];
        result1 = JSON.parse(result1.JsonData);
        this.mws_total_old = result1.mws_total;
        this.mws_total = result2.mws_total;
        this.total_score_end = this.mws_total_old + this.mws_total + 20;

        this.ds.submitAppData(data3).subscribe((response3: any) => {
          if (response3 != null) {
            let result3 = response3[response3.length - 1];
            this.m_score = parseInt(result3.m_score);
            this.total_score_end2 =
              this.mws_total_old + this.mws_total + this.m_score;
          } else {
            this.total_score_end2 = this.mws_total_old + this.mws_total;
          }
          this.getSeaftySorce();
        });
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

  getNetworth() {
    let data = new FormData();
    data.append('id', this.openId);
    data.append('action', 'getSingleNetWorth');
    this.ds.submitAppData(data).subscribe((response: any) => {
      if (response.length != 0) {
        let networth = response[response.length - 1];
        this.c_loanAmount = networth.c_loanAmount;
        this.c_intrestRate = networth.c_intrestRate;
        this.c_months = networth.c_months;
        this.c_emi = networth.c_emi;
      }
    });
  }

  getSeaftySorce() {
    let score = this.total_score_end2;
    if (score >= 80) {
      this.safetyScore = 'High';
    } else if (score >= 70 && score < 80) {
      this.safetyScore = 'Good';
    } else if (score >= 60 && score < 70) {
      this.safetyScore = 'Moderate';
    } else if (score >= 50 && score < 60) {
      this.safetyScore = 'Average';
    } else {
      this.safetyScore = 'Poor';
    }
  }

  updateTotal() {
    this.total_score_end2 =
      this.mws_total_old + this.mws_total + JSON.parse(this.m_score);
    console.log(this.mws_total_old, this.mws_total, this.m_score);
    this.getSeaftySorce();
  }

  handleSubmit() {
    if(this.viewOnly){
      this.goNext();
      return;
    }
    this.spiner.show();
    let JsonData = {
      mws_total: this.mws_total,
      mws_total_old: this.mws_total_old,
    };
    let data: any = new FormData();

    data.append('action', 'scoreSubmit');
    data.append('ref_id', this.openId);
    data.append('m_score', this.m_score);
    data.append('total1', this.total_score_end);
    data.append('total2', this.total_score_end2);

    data.append('c_intrestRate', this.c_intrestRate);
    data.append('c_months', this.c_months);
    data.append('c_emi', this.c_emi);

    if(this.logedInUser.type == "Credit-Underwriter"){
      // return ("Processing by Credit Analyst("+this.logedInUser.f_name +")");
      // data.append('action', 'submit-all-forms');
      data.append('ref_id', this.openId);
      data.append('status', "Submitted by Credit Underwriter("+this.logedInUser.f_name +")");
      this.ds.submitAppData(data).subscribe((response: any) => {
        this.spiner.hide();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Application Submitted',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl('dashboard');
        // this.goNext();
        // console.log(response);
      });
    }else if(this.logedInUser.type == "Credit-Approver"){
      data.append('ref_id', this.openId);
      data.append('status', "Processing by Credit Approver("+this.logedInUser.f_name +")");
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
        console.log(response);
      });
    }else if(this.logedInUser.type == "Admin"){
      data.append('ref_id', this.openId);
      data.append('status', "Processing by Admin");
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
        console.log(response);
      });
    }



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

  updateTotal2() {
    console.log('ok');
    let result: any = this.pmt(
      this.c_intrestRate / 12 / 100,
      this.c_months,
      this.c_loanAmount,
      0,
      0
    );
    this.c_emi = Math.round(result);
  }

  goNext() {
    // this.router.navigateByUrl('add-info/' + this.openId);
    this.sideNav.openPage(2, 9);
    // this.router.navigateByUrl('report/' + this.openId);
  }

  goBack() {
    // this.router.navigateByUrl('add-info/' + this.openId);
    this.sideNav.openPage(2, 6);
  }
}
