import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';

@Component({
  selector: 'app-risk-two',
  templateUrl: './risk-two.component.html',
  styleUrls: ['./risk-two.component.css'],
  providers: [SideNavComponent],
})
export class RiskTwoComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private spiner: NgxSpinnerService,
    private sideNav: SideNavComponent
  ) { }

  openId: any = 0;

  mws1 = 0;
  mws2 = 0;
  mws3 = 0;
  mws4 = 0;
  mws5 = 0;
  mws6 = 0;
  mws_total = 0;
  mws_total_old = 0;
  total_score_end = 0;

  s_mws1 = 0;
  s_mws2 = 0;
  s_mws3 = 0;
  s_mws4 = 0;
  s_mws5 = 0;
  s_mws6 = 0;
  s_mws_total = 0;

  a1 = '';
  a2 = '';
  a3 = '';
  a4 = '';
  // newly added ooptions
  a5 = "";
  a6 = "";
  // end newly added ooptions
  b1 = '';
  b2 = '';
  b3 = '';
  b4 = '';

  c1 = '';
  c2 = '';
  c3 = '';
  c4 = '';

  d1 = '';
  d2 = '';
  d3 = '';
  d4 = '';
  d5 = '';
  d6 = '';
  d7 = '';
  d8 = '';

  e1 = '';
  e2 = '';
  e3 = '';

  f1 = '';
  f2 = '';
  f3 = '';
  f4 = '';

  logedInUser: any;
  userId = "";
  status = "";
  viewOnly: any = false;
  nextButtonText: any = "";
  url:any = "";
  vehicleType:any = "new-vehicle";
  marginAge:any = 0;

  ques1A:any = "";
  ques1B:any = "";
  ques1C:any = "";
  ques1D:any = "";
  ques1E:any = "";
  ques1F:any = "";

  ques2A:any = "";
  ques2B:any = "";
  ques2C:any = "";
  ques2D:any = "";

  ques4A:any = "";
  ques4B:any = "";
  ques4C:any = "";
  ques4D:any = "";
  ques4E:any = "";
  ques4F:any = "";
  ques4G:any = "";
  ques4H:any = "";

  ngOnInit(): void {
    this.url = this.ds.commonUrl(this.router);
    this.route.params.subscribe((params: any) => {
      if (params.id != null) {
        localStorage.setItem("applicant1Id", params.id)
        this.openId = params.id;
        if (this.openId != 0) {
          this.getSingleData();
          this.getSingleAppData()
        }
      }
    });
    this.logedInUser = this.ds.userLoggedIn()
    let checkView = localStorage.getItem("viewOnly")
    if (checkView === 'true') {
      this.viewOnly = true;
      this.nextButtonText = "Next"
    } else {
      this.nextButtonText = "Save And Next"
    }
  }

  handleUpdate(value: number, type: number, no: number) {
    if (type == 1) {
      if (no == 1) {
        this.a1 = 'activeOpt';
        this.a2 = '';
        this.a3 = '';
        this.a4 = '';
        this.a5 = '';
        this.a6 = '';
      }

      if (no == 2) {
        this.a1 = '';
        this.a2 = 'activeOpt';
        this.a3 = '';
        this.a4 = '';
        this.a5 = '';
        this.a6 = '';
      }
      if (no == 3) {
        this.a1 = '';
        this.a2 = '';
        this.a3 = 'activeOpt';
        this.a4 = '';
        this.a5 = '';
        this.a6 = '';
      }
      if (no == 4) {
        this.a1 = '';
        this.a2 = '';
        this.a3 = '';
        this.a4 = 'activeOpt';
        this.a5 = '';
        this.a6 = '';
      }
      if (no == 5) {
        this.a1 = '';
        this.a2 = '';
        this.a3 = '';
        this.a4 = '';
        this.a5 = 'activeOpt';
        this.a6 = '';
      }
      if (no == 6) {
        this.a1 = '';
        this.a2 = '';
        this.a3 = '';
        this.a4 = '';
        this.a5 = '';
        this.a6 = 'activeOpt';
      }

      this.mws1 = value * 3;
      this.s_mws1 = value;
    }
    if (type == 2) {
      if (no == 1) {
        this.b1 = 'activeOpt';
        this.b2 = '';
        this.b3 = '';
        this.b4 = '';
      }
      if (no == 2) {
        this.b1 = '';
        this.b2 = 'activeOpt';
        this.b3 = '';
        this.b4 = '';
      }
      if (no == 3) {
        this.b1 = '';
        this.b2 = '';
        this.b3 = 'activeOpt';
        this.b4 = '';
      }
      if (no == 4) {
        this.b1 = '';
        this.b2 = '';
        this.b3 = '';
        this.b4 = 'activeOpt';
      }
      this.mws2 = value * 1;
      this.s_mws2 = value;
    }
    if (type == 3) {
      if (no == 1) {
        this.c1 = 'activeOpt';
        this.c2 = '';
        this.c3 = '';
        this.c4 = '';
      }
      if (no == 2) {
        this.c1 = '';
        this.c2 = 'activeOpt';
        this.c3 = '';
        this.c4 = '';
      }
      if (no == 3) {
        this.c1 = '';
        this.c2 = '';
        this.c3 = 'activeOpt';
        this.c4 = '';
      }
      if (no == 4) {
        this.c1 = '';
        this.c2 = '';
        this.c3 = '';
        this.c4 = 'activeOpt';
      }

      this.mws3 = value * 1;
      this.s_mws3 = value;
    }
    if (type == 4) {
      if (no == 1) {
        this.d1 = 'activeOpt';
        this.d2 = '';
        this.d3 = '';
        this.d4 = '';
        this.d5 = '';
        this.d6 = '';
        this.d7 = '';
        this.d8 = '';
      }
      if (no == 2) {
        this.d1 = '';
        this.d2 = 'activeOpt';
        this.d3 = '';
        this.d4 = '';
        this.d5 = '';
        this.d6 = '';
        this.d7 = '';
        this.d8 = '';
      }
      if (no == 3) {
        this.d1 = '';
        this.d2 = '';
        this.d3 = 'activeOpt';
        this.d4 = '';
        this.d5 = '';
        this.d6 = '';
        this.d7 = '';
        this.d8 = '';
      }
      if (no == 4) {
        this.d1 = '';
        this.d2 = '';
        this.d3 = '';
        this.d4 = 'activeOpt';
        this.d5 = '';
        this.d6 = '';
        this.d7 = '';
        this.d8 = '';
      }
      if (no == 5) {
        this.d1 = '';
        this.d2 = '';
        this.d2 = '';
        this.d4 = '';
        this.d5 = 'activeOpt';
        this.d6 = '';
        this.d7 = '';
        this.d8 = '';
      }
      if (no == 6) {
        this.d1 = '';
        this.d2 = '';
        this.d2 = '';
        this.d4 = '';
        this.d5 = '';
        this.d6 = 'activeOpt';
        this.d7 = '';
        this.d8 = '';
      }
      if (no == 7) {
        this.d1 = '';
        this.d2 = '';
        this.d2 = '';
        this.d4 = '';
        this.d5 = '';
        this.d6 = '';
        this.d7 = 'activeOpt';
        this.d8 = '';
      }
      if (no == 8) {
        this.d1 = '';
        this.d2 = '';
        this.d2 = '';
        this.d4 = '';
        this.d5 = '';
        this.d6 = '';
        this.d7 = '';
        this.d8 = 'activeOpt';
      }
      this.mws4 = value * 3;
      this.s_mws4 = value;
    }
    if (type == 5) {
      if (no == 1) {
        this.e1 = 'activeOpt';
        this.e2 = '';
        this.e3 = '';
      }
      if (no == 2) {
        this.e1 = '';
        this.e2 = 'activeOpt';
        this.e3 = '';
      }
      if (no == 3) {
        this.e1 = '';
        this.e2 = '';
        this.e3 = 'activeOpt';
      }
      this.mws5 = value * 2;
      this.s_mws5 = value;
    }
    if (type == 6) {
      if (no == 1) {
        this.f1 = 'activeOpt';
        this.f2 = '';
        this.f3 = '';
        this.f4 = '';
      }
      if (no == 2) {
        this.f1 = '';
        this.f2 = 'activeOpt';
        this.f3 = '';
        this.f4 = '';
      }
      if (no == 3) {
        this.f1 = '';
        this.f2 = '';
        this.f3 = 'activeOpt';
        this.f4 = '';
      }

      if (no == 4) {
        this.f1 = '';
        this.f2 = '';
        this.f3 = '';
        this.f4 = 'activeOpt';
      }
      this.mws6 = value * 2;
      this.s_mws6 = value;
    }
    this.mws_total =
      this.mws1 + this.mws2 + this.mws3 + this.mws4 + this.mws5 + this.mws6;

    this.total_score_end = this.mws_total_old + this.mws_total + 20;
  }

  getNetWorth() {
    let data = new FormData();
    data.append('id', this.openId);
    data.append('action', 'getSingleNetWorth');
    this.ds.submitAppData(data).subscribe((response: any) => {
      let newWorth = response[response.length - 1];
      let IIR1 = newWorth.IIR1;
      let IIR2 = newWorth.IIR2;

      if(this.url == 'personal-vehicle-loan'){
        this.ques1A = "A. Applicant's estimated Monthly Income is at 5 times and more of Monthly Installment.";
        this.ques1B = "B. Applicant's estimated Monthly Income is at 4 times and more but < 5 times of Monthly Installment.";
        this.ques1C = "C. Applicant's estimated Monthly Income is at 3 times and more but < 4 times of Monthly Installment.";
        this.ques1D = "D. Applicant's estimated Monthly Income is at 2 time and more but Less than 3  times of Monthly Installment.";
        this.ques1E = "E. Applicant's estimated Monthly Income is at 1 time and more but Less than  2 times of Monthly Installment.";
        this.ques1F = "F. Applicant's estimated Monthly Income is Less than 1 time of Monthly Installment.";

        this.ques2A = "A. Estimated combined Family Income is  6 and More  times of Monthly Installment.";
        this.ques2B = "B. Estimated combined Family Income is at 4 times and more but  less than 6 times of Monthly Installment.";
        this.ques2C = "C. Estimated combined Family Income is at 2 times and more but less than 4 times of Monthly Installment.";
        this.ques2D = "D. Estimated combined Family Income is Less than 2 times of Monthly Installment.";
        console.log('vehicleType', this.vehicleType)
        this.onChangeVehicleType()
        if (IIR1 >= 5) {
          this.handleUpdate(5, 1, 1);
        }
        if (IIR1 >= 4 && IIR1 < 5) {
          this.handleUpdate(4, 1, 2);
        }
        if (IIR1 >= 3 && IIR1 < 4) {
          this.handleUpdate(3, 1, 3);
        }
        if (IIR1 >= 2 && IIR1 < 3) {
          this.handleUpdate(2, 1, 4);
        }
        if (IIR1 >= 1 && IIR1 < 2) {
          this.handleUpdate(1, 1, 5);
        }
        if (IIR1 < 1) {
          this.handleUpdate(-3, 1, 6);
        }

        if (IIR2 >= 6) {
          this.handleUpdate(4, 2, 1);
        }
        if (IIR2 >= 4 && IIR2 < 6) {
          this.handleUpdate(3, 2, 2);
        }
        if (IIR2 >= 2 && IIR2 < 4) {
          this.handleUpdate(1.5, 2, 3);
        }
        if (IIR2 < 2) {
          this.handleUpdate(-1, 2, 4);
        }
      }else{
        this.ques1A = "A. Applicant's estimated Monthly Income is at 3 times and more of Monthly Installment.";
        this.ques1B = "B. Applicant's estimated Monthly Income is at 2 time and more but Less than 3 times of Monthly Installment.";
        this.ques1C = "C. Applicant's estimated Monthly Income is at 1 time and more but Less than 2 times of Monthly Installment.";
        this.ques1D = "D. Applicant's estimated Monthly Income is Less than 1 time of Monthly Installment.";

        this.ques2A = "A. Estimated combined Family Income is more than 4 times of Monthly Installment.";
        this.ques2B = "B. Estimated combined Family Income is at 3 times and more but less than 4 times of Monthly Installment.";
        this.ques2C = "C. Estimated combined Family Income is at 2 times and more but less than 3 times of Monthly Installment.";
        this.ques2D = " D. Estimated combined Family Income is Less than 2 times of Monthly Installment.";

        this.ques4A = "A. Applicant's Margin Contribution is Less than 10 %";
        this.ques4B = "B. Applicant's Margin Contribution is 10 % and more but Less than 15 %";
        this.ques4C = "C. Applicant's Margin Contribution is 15 % and more but Less than 20 %";
        this.ques4D = "D. Applicant's Margin Contribution is 20 % and more but Less than 25 %";
        this.ques4E = "E. Applicant's Margin Contribution is 25 % and more but Less than 30 %";
        this.ques4F = "F. Applicant's Margin Contribution is 30 % and more but Less than 35 %";
        this.ques4G = "G. Applicant's Margin Contribution is 35 % and more but Less than 40 %";
        this.ques4H = "H. Applicant's Margin Contribution is 40 % and more.";
        if (IIR1 >= 3) {
          this.handleUpdate(5, 1, 1);
        }
        if (IIR1 >= 2 && IIR1 < 3) {
          this.handleUpdate(3, 1, 2);
        }
        if (IIR1 >= 1 && IIR1 < 2) {
          this.handleUpdate(2, 1, 3);
        }
        if (IIR1 < 1) {
          this.handleUpdate(-1, 1, 4);
        }
  
        if (IIR2 >= 4) {
          this.handleUpdate(4, 2, 1);
        }
        if (IIR2 >= 3 && IIR2 < 4) {
          this.handleUpdate(3, 2, 2);
        }
        if (IIR2 >= 2 && IIR2 < 3) {
          this.handleUpdate(1.5, 2, 3);
        }
        if (IIR2 < 2) {
          this.handleUpdate(-1, 2, 4);
        }
      }

    });
  }

  onChangeVehicleType(){
    console.log('this.vehicleType',this.vehicleType)
    if(this.vehicleType =="new-vehicle"){
      this.ques4A = "A. Applicant's Margin Contribution is Less than 10 % for NEW vehicles .";
      this.ques4B = "B. Applicant's Margin Contribution is 10 % and more  but Less than 15 % for NEW Vehicles.";
      this.ques4C = "C. Applicant's Margin Contribution is 15 % and more but Less than 20 % for NEW Vehicles.";
      this.ques4D = "D. Applicant's Margin Contribution is 20 % and more but Less than 25 % for NEW Vehicles";
      this.ques4E = "E. Applicant's Margin Contribution is 25 % and more but Less than 30 % for NEW Vehicles.";
      this.ques4F = "F. Applicant's Margin Contribution is 30 % and more but Less than 35 % for NEW Vehicles.";
      this.ques4G = "G. Applicant's Margin Contribution is 35 % and more but Less than 40 % for NEW Vehicles.";
      this.ques4H = "H. Applicant's Margin Contribution is 40 % and more for NEW Vehicles.";
    }else{
      this.ques4A = "A. Applicant's Margin Contribution is Less than 20 % for USED Vehicles .";
      this.ques4B = "B. Applicant's Margin Contribution is 20 % and more  but Less than 25 % for USED Vehicles.";
      this.ques4C = "C. Applicant's Margin Contribution is 25 % and more but Less than 30 % for USED  Vehicles.";
      this.ques4D = "D. Applicant's Margin Contribution is 30 % and more but Less than 35 % for USED Vehicles";
      this.ques4E = "E. Applicant's Margin Contribution is 35 % and more but Less than 40 % for USED Vehicles.";
      this.ques4F = "F. Applicant's Margin Contribution is 40 % and more but Less than 45 % for USED Vehicles.";
      this.ques4G = "G. Applicant's Margin Contribution is 45 % and more but Less than 50 % for USED Vehicles. ";
      this.ques4H = "H. Applicant's Margin Contribution is 50 % and more for USED Vehicles.";
    }
    if(this.vehicleType == "new-vehicle"){
      if (this.marginAge < 10) {
        this.handleUpdate(-5, 4, 1);
      }
      if (this.marginAge >= 10 && this.marginAge < 15) {
        this.handleUpdate(2.5, 4, 2);
      }
      if (this.marginAge >= 15 && this.marginAge < 20) {
        this.handleUpdate(2.75, 4, 3);
      }
      if (this.marginAge >= 20 && this.marginAge < 25) {
        this.handleUpdate(3, 4, 4);
      }
      if (this.marginAge >= 25 && this.marginAge < 30) {
        this.handleUpdate(3.5, 4, 5);
      }
      if (this.marginAge >= 30 && this.marginAge < 35) {
        this.handleUpdate(4, 4, 6);
      }
      if (this.marginAge >= 35 && this.marginAge < 40) {
        this.handleUpdate(4.5, 4, 7);
      }
      if (this.marginAge >= 40) {
        this.handleUpdate(5, 4, 8);
      }
    }else{
      if (this.marginAge < 20) {
        this.handleUpdate(-5, 4, 1);
      }
      if (this.marginAge >= 20 && this.marginAge < 25) {
        this.handleUpdate(2.5, 4, 2);
      }
      if (this.marginAge >= 25 && this.marginAge < 30) {
        this.handleUpdate(2.75, 4, 3);
      }
      if (this.marginAge >= 30 && this.marginAge < 35) {
        this.handleUpdate(3, 4, 4);
      }
      if (this.marginAge >= 35 && this.marginAge < 40) {
        this.handleUpdate(3.5, 4, 5);
      }
      if (this.marginAge >= 40 && this.marginAge < 45) {
        this.handleUpdate(4, 4, 6);
      }
      if (this.marginAge >= 45 && this.marginAge < 50) {
        this.handleUpdate(4.5, 4, 7);
      }
      if (this.marginAge >= 50) {
        this.handleUpdate(5, 4, 8);
      }
    }
  
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('this.vehicleType',this.vehicleType)
  //   this.onChangeVehicleType()
  // }

  getLoanRequest() {
    let data = new FormData();
    data.append('id', this.openId);
    data.append('action', 'getSingleDataLoan');
    this.ds.submitAppData(data).subscribe((response: any) => {
      let locanR = response[response.length - 1];
      // let marginAge = locanR.marginAge;
      let marginAge = 30;
      this.marginAge = marginAge;
      // this.vehicleType = locanR.vehicleType;

      if(this.url == 'personal-vehicle-loan'){
        if(this.vehicleType == "new-vehicle"){
          if (marginAge < 10) {
            this.handleUpdate(-5, 4, 1);
          }
          if (marginAge >= 10 && marginAge < 15) {
            this.handleUpdate(2.5, 4, 2);
          }
          if (marginAge >= 15 && marginAge < 20) {
            this.handleUpdate(2.75, 4, 3);
          }
          if (marginAge >= 20 && marginAge < 25) {
            this.handleUpdate(3, 4, 4);
          }
          if (marginAge >= 25 && marginAge < 30) {
            this.handleUpdate(3.5, 4, 5);
          }
          if (marginAge >= 30 && marginAge < 35) {
            this.handleUpdate(4, 4, 6);
          }
          if (marginAge >= 35 && marginAge < 40) {
            this.handleUpdate(4.5, 4, 7);
          }
          if (marginAge >= 40) {
            this.handleUpdate(5, 4, 8);
          }
        }else{
          if (marginAge < 20) {
            this.handleUpdate(-5, 4, 1);
          }
          if (marginAge >= 20 && marginAge < 25) {
            this.handleUpdate(2.5, 4, 2);
          }
          if (marginAge >= 25 && marginAge < 30) {
            this.handleUpdate(2.75, 4, 3);
          }
          if (marginAge >= 30 && marginAge < 35) {
            this.handleUpdate(3, 4, 4);
          }
          if (marginAge >= 35 && marginAge < 40) {
            this.handleUpdate(3.5, 4, 5);
          }
          if (marginAge >= 40 && marginAge < 45) {
            this.handleUpdate(4, 4, 6);
          }
          if (marginAge >= 45 && marginAge < 50) {
            this.handleUpdate(4.5, 4, 7);
          }
          if (marginAge >= 50) {
            this.handleUpdate(5, 4, 8);
          }
        }
      }else{
        if (marginAge < 10) {
          this.handleUpdate(-5, 4, 1);
        }
        if (marginAge >= 10 && marginAge < 15) {
          this.handleUpdate(-1, 4, 2);
        }
        if (marginAge >= 15 && marginAge < 20) {
          this.handleUpdate(2, 4, 3);
        }
        if (marginAge >= 20 && marginAge < 25) {
          this.handleUpdate(3, 4, 4);
        }
        if (marginAge >= 25 && marginAge < 30) {
          this.handleUpdate(3.5, 4, 5);
        }
        if (marginAge >= 30 && marginAge < 35) {
          this.handleUpdate(4, 4, 6);
        }
        if (marginAge >= 35 && marginAge < 40) {
          this.handleUpdate(4.5, 4, 7);
        }
        if (marginAge >= 40) {
          this.handleUpdate(5, 4, 8);
        }
      }
    });
  }

  getSingleData() {
    let data = new FormData();
    data.append('id', this.openId);
    data.append('action', 'getSinglerisk-2');
    this.ds.submitAppData(data).subscribe((response: any) => {
      if (response !== null) {
        let result = response[response.length - 1];
        result = JSON.parse(result.JsonData);
        this.vehicleType = result.vehicleType;
        this.mws1 = result.mws1;
        this.mws2 = result.mws2;
        this.mws3 = result.mws3;
        this.mws4 = result.mws4;
        this.mws5 = result.mws5;
        this.mws6 = result.mws6;
        this.s_mws1 = result.s_mws1;
        this.s_mws2 = result.s_mws2;
        this.s_mws3 = result.s_mws3;
        this.s_mws4 = result.s_mws4;
        this.s_mws5 = result.s_mws5;
        this.s_mws6 = result.s_mws6;
        this.mws_total = result.mws_total;
        this.s_mws_total = result.s_mws_total;
        this.mws_total_old = result.mws_total_old;
        this.total_score_end = result.total_score_end;

        this.a1 = result.a1;
        this.a2 = result.a2;
        this.a3 = result.a3;
        this.a4 = result.a4;

        this.b1 = result.b1;
        this.b2 = result.b2;
        this.b3 = result.b3;
        this.b4 = result.b4;
        this.c1 = result.c1;
        this.c2 = result.c2;
        this.c3 = result.c3;
        this.c4 = result.c4;
        this.d1 = result.d1;
        this.d2 = result.d2;
        this.d3 = result.d3;
        this.d4 = result.d4;
        this.d5 = result.d5;
        this.d6 = result.d6;
        this.d7 = result.d7;
        this.d8 = result.d8;
        this.e1 = result.e1;
        this.e2 = result.e2;
        this.e3 = result.e3;
        this.f1 = result.f1;
        this.f2 = result.f2;
        this.f3 = result.f3;
        this.f4 = result.f4;
      }

      let data2 = new FormData();
      data2.append('id', this.openId);
      data2.append('action', 'getSinglerisk-1');
      this.ds.submitAppData(data2).subscribe((response2: any) => {
        let result = response2[response2.length - 1];
        result = JSON.parse(result.JsonData);
        this.mws_total_old = result.mws_total;
        this.total_score_end = this.mws_total_old + this.mws_total + 20;
        this.getNetWorth();
        this.getLoanRequest();
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
    console.log
    if (this.viewOnly) {
      this.goNext();
      return;
    }

    if (this.c1 == "" && this.c2 == "" && this.c3 == "" && this.c4 == "") {
      alert("Please Select any option of Applicant's Saving and other deposit accounts ")
      return;
    }

    if (this.e1 == "" && this.e2 == "" && this.e3 == "") {
      alert("Please Select any option of Source of Margin Contribution")
      return;
    }

    if (this.f1 == "" && this.f2 == "" && this.f3 == "" && this.f4 == "") {
      alert("Please Select any option of Debit Standing Instructions")
      return;
    }
    this.spiner.show();
    let JsonData = {
      vehicleType:this.vehicleType,
      mws1: this.mws1,
      mws2: this.mws2,
      mws3: this.mws3,
      mws4: this.mws4,
      mws5: this.mws5,
      mws6: this.mws6,
      mws_total: this.mws_total,
      s_mws1: this.s_mws1,
      s_mws2: this.s_mws2,
      s_mws3: this.s_mws3,
      s_mws4: this.s_mws4,
      s_mws5: this.s_mws5,
      s_mws6: this.s_mws6,
      s_mws_total: this.s_mws_total,
      mws_total_old: this.mws_total_old,
      total_score_end: this.total_score_end,
      a1: this.a1,
      a2: this.a2,
      a3: this.a3,
      a4: this.a4,
      b1: this.b1,
      b2: this.b2,
      b3: this.b3,
      b4: this.b4,
      c1: this.c1,
      c2: this.c2,
      c3: this.c3,
      c4: this.c4,
      d1: this.d1,
      d2: this.d2,
      d3: this.d3,
      d4: this.d4,
      d5: this.d5,
      d6: this.d6,
      d7: this.d7,
      d8: this.d8,
      e1: this.e1,
      e2: this.e2,
      e3: this.e3,
      f1: this.f1,
      f2: this.f2,
      f3: this.f3,
      f4: this.f4
    };
    // console.log(JsonData);
    let data: any = new FormData();

    data.append('action', 'submit-risk-2');
    data.append('ref_id', this.openId);
    data.append('JsonData', JSON.stringify(JsonData));
    // data.append('status', "risk-2");
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
    // this.router.navigateByUrl('score/' + this.openId);
    // this.sideNav.openPage(2, 8);
    this.sideNav.openPage(2, 7);
  }

  goBack() {
    // this.router.navigateByUrl('risk-1/' + this.openId);
    this.sideNav.openPage(2, 4);
  }
}
