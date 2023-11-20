import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';

@Component({
  selector: 'app-site-vist',
  templateUrl: './site-vist.component.html',
  styleUrls: ['./site-vist.component.css'],
  providers: [SideNavComponent],
})
export class SiteVistComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private spiner: NgxSpinnerService,
    private sideNav: SideNavComponent
  ) {}

  openId: any = 0;

  name1 = '';
  name2 = '';
  designation1 = '';
  designation2 = '';
  visitDate1 = '';
  visitDate2 = '';
  details = '';
  mValue: any = '';
  dsValue: any = '';
  reportDate = '';
  valuerName = '';
  comments1 = '';
  advocateName = '';
  reportDate2 = '';
  comments2 = '';
  comments3 = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.openId = params.id;
      if (this.openId != 0) {
        this.getSingleData();
      }
    });
  }

  getSingleData() {
    let data = new FormData();

    data.append('id', this.openId);
    data.append('action', 'getSingleSiteVisit');

    this.ds.submitAppData(data).subscribe((response: any) => {
      let result = response[response.length - 1];

      this.name1 = result.name1;
      this.name2 = result.name2;
      this.designation1 = result.designation1;
      this.designation2 = result.designation2;
      this.visitDate1 = result.visitDate1;
      this.visitDate2 = result.visitDate2;
      this.details = result.details;
      this.mValue = result.mValue;
      this.dsValue = result.dsValue;
      this.reportDate = result.reportDate;
      this.valuerName = result.valuerName;
      this.comments1 = result.comments1;
      this.advocateName = result.advocateName;
      this.reportDate2 = result.reportDate2;
      this.comments2 = result.comments2;
      this.comments3 = result.comments3;
    });
  }

  handleSubmit() {
    this.spiner.show();
    let data: any = new FormData();

    data.append('action', 'submit-site-visit');

    data.append('ref_id', this.openId);
    data.append('name1', this.name1);
    data.append('name2', this.name2);
    data.append('designation1', this.designation1);
    data.append('designation2', this.designation2);
    data.append('visitDate1', this.visitDate1);
    data.append('visitDate2', this.visitDate2);
    data.append('details', this.details);
    data.append('mValue', this.mValue);
    data.append('dsValue', this.dsValue);
    data.append('reportDate', this.reportDate);
    data.append('valuerName', this.valuerName);
    data.append('comments1', this.comments1);
    data.append('advocateName', this.advocateName);
    data.append('reportDate2', this.reportDate2);
    data.append('comments2', this.comments2);
    data.append('comments3', this.comments3);

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
    // this.router.navigateByUrl('risk-1/' + this.openId);
    this.sideNav.openPage(2, 4);
  }

  updateTotal() {
    console.log('ok');
  }
  goBack() {
    this.router.navigateByUrl('client-vist/' + this.openId);
  }
}
