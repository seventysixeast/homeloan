import { Component, OnInit } from '@angular/core';
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
  ) {}

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

  logedInUser : any;
  userId = "";
  status = "";
  viewOnly: any = false;
  nextButtonText: any = "";

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
    let checkView = localStorage.getItem("viewOnly")
    if(checkView === 'true'){
      this.viewOnly =  true;
      this.nextButtonText = "Next"
    }else{
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
      }

      if (no == 2) {
        this.a1 = '';
        this.a2 = 'activeOpt';
        this.a3 = '';
        this.a4 = '';
      }
      if (no == 3) {
        this.a1 = '';
        this.a2 = '';
        this.a3 = 'activeOpt';
        this.a4 = '';
      }
      if (no == 4) {
        this.a1 = '';
        this.a2 = '';
        this.a3 = '';
        this.a4 = 'activeOpt';
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
    });
  }

  getLoanRequest() {
    let data = new FormData();
    data.append('id', this.openId);
    data.append('action', 'getSingleDataLoan');
    this.ds.submitAppData(data).subscribe((response: any) => {
      let locanR = response[response.length - 1];
      let marginAge = locanR.marginAge;

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
    if(this.viewOnly){
      this.goNext();
      return;
    }
    this.spiner.show();
    let JsonData = {
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
    console.log(JsonData);
    let data: any = new FormData();

    data.append('action', 'submit-risk-2');
    data.append('ref_id', this.openId);
    data.append('JsonData', JSON.stringify(JsonData));
    // data.append('status', "risk-2");
    data.append('status', this.ds.addStatus(this.logedInUser, this.userId,this.status));

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
