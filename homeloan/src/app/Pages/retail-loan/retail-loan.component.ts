import { Component } from '@angular/core';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';

@Component({
  selector: 'app-retail-loan',
  templateUrl: './retail-loan.component.html',
  styleUrls: ['./retail-loan.component.css'],
  // providers: [SideNavComponent],
})
export class RetailLoanComponent {
  constructor(
    // private ds: DataService,
    // private route: ActivatedRoute,
    // private router: Router,
    // private spiner: NgxSpinnerService,
    // private sideNav: SideNavComponent
  ) {}

  gotodashboard(){
    // window.location.href = "/homeloan/dashboard"
    window.location.href = "/retailloan/homeloan/dashboard"
  }

  gotoPersonalVehicleLoanDashboard(){
    // window.location.href = "/personal-vehicle-loan/dashboard"
    window.location.href = "/retailloan/personal-vehicle-loan/dashboard"

    // https://76east.com/retailloan/personal-vehicle-loan/dashboard
  }

}
