import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInfoComponent } from './Pages/add-info/add-info.component';
import { ApplicantDataComponent } from './Pages/applicant-data/applicant-data.component';
import { ClientVistComponent } from './Pages/client-vist/client-vist.component';
import { DashbordComponent } from './Pages/dashbord/dashbord.component';
import { GuarantorDataComponent } from './Pages/guarantor-data/guarantor-data.component';
import { LoanRequestComponent } from './Pages/loan-request/loan-request.component';
import { MedisUploadComponent } from './Pages/medis-upload/medis-upload.component';
import { NetWorthComponent } from './Pages/net-worth/net-worth.component';
import { RiskOneComponent } from './Pages/risk-one/risk-one.component';
import { RiskTwoComponent } from './Pages/risk-two/risk-two.component';
import { ScoreComponent } from './Pages/score/score.component';
import { SiteVistComponent } from './Pages/site-vist/site-vist.component';
import { ReportGenComponent } from './report-gen/report-gen.component';
import { UFilesComponent } from './u-files/u-files.component';
import { ApplicantData2Component } from './Pages/applicant-data2/applicant-data2.component';
import { GuarantorData2Component } from './Pages/guarantor-data2/guarantor-data2.component';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { LayoutMainComponent } from './layout-main/layout-main.component';
import { UsersComponent } from './Pages/Auth/users/users.component';
import { UsersAddComponent } from './Pages/Auth/users-add/users-add.component';
import { UploadReportComponent } from './Pages/upload-report/upload-report.component';
import { RetailLoanComponent } from './Pages/retail-loan/retail-loan.component';
import { AdminGuard } from './admin.guard'; 
import { UserGuard } from './user.guard';
import { GuarantorData3Component } from './Pages/guarantor-data3/guarantor-data3.component';
import { MediaUploadPersonalLoanComponent } from './Pages/media-upload-personal-loan/media-upload-personal-loan.component';
import { ScorePersonalLoanComponent } from './Pages/score-personal-loan/score-personal-loan.component';
import { ReportGenPersonalLoanComponent } from './report-gen-personal-loan/report-gen-personal-loan.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: 'retail-loan',
  //   component: RetailLoanComponent,
  // },
  {
    path: 'homeloan',
    // path: '',
    component: LayoutMainComponent,
		// canActivate: [UserGuard],
    canActivate: [AdminGuard],
    children: [
      {
        path: 'dashboard',
        component: DashbordComponent,
      },
      // {
      //   path: 'retailloan',
      //   component: RetailLoanComponent,
      // },
      {
        path: 'applicant-data',
        component: ApplicantDataComponent,
      },
      {
        path: 'applicant-data/:id',
        component: ApplicantDataComponent,
      },
      {
        path: 'applicant-data2/:id',
        component: ApplicantData2Component,
      },
      {
        path: 'guarantor-data/:id',
        component: GuarantorDataComponent,
      },
      {
        path: 'guarantor-data2/:id',
        component: GuarantorData2Component,
      },
      {
        path: 'loan-request/:id',
        component: LoanRequestComponent,
      },
      {
        path: 'net-worth/:id',
        component: NetWorthComponent,
      },
      {
        path: 'client-vist/:id',
        component: ClientVistComponent,
      },
      {
        path: 'site-vist/:id',
        component: SiteVistComponent,
      },
      {
        path: 'risk-1/:id',
        component: RiskOneComponent,
      },
      {
        path: 'risk-2/:id',
        component: RiskTwoComponent,
      },
      {
        path: 'score/:id',
        component: ScoreComponent,
      },
      {
        path: 'add-info/:id',
        component: AddInfoComponent,
      },
      {
        path: 'media-upload/:id',
        component: MedisUploadComponent,
      },
      {
        path: 'report/:id',
        component: ReportGenComponent,
      },
      {
        path: 'upload-report/:id',
        component: UploadReportComponent,
      },

      {
        path: 'upload-files/:id',
        component: UFilesComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users-add',
        component: UsersAddComponent,
      },
      {
        path: 'user-update/:id',
        component: UsersAddComponent,
      },
    ],
  },
  // {
  //   path: '',
  //   component: LayoutMainComponent,
	// 	// canActivate: [AdminGuard],
  //   children: [
  //     {
  //       path: 'users',
  //       component: UsersComponent,
  //     },
  //     {
  //       path: 'users-add',
  //       component: UsersAddComponent,
  //     },
  //   ],
  // },

  {
    path: 'personal-vehicle-loan',
    // path: '',
    component: LayoutMainComponent,
		// canActivate: [UserGuard],
    canActivate: [AdminGuard],
    children: [
      {
        path: 'dashboard',
        component: DashbordComponent,
      },
      // {
      //   path: 'retailloan',
      //   component: RetailLoanComponent,
      // },
      {
        path: 'applicant-data',
        component: ApplicantDataComponent,
      },
      {
        path: 'applicant-data/:id',
        component: ApplicantDataComponent,
      },
      {
        path: 'applicant-data2/:id',
        component: ApplicantData2Component,
      },
      {
        path: 'guarantor-data/:id',
        component: GuarantorDataComponent,
      },
      {
        path: 'guarantor-data2/:id',
        component: GuarantorData2Component,
      },
      {
        path: 'guarantor-data3/:id',
        component: GuarantorData3Component,
      },
      {
        path: 'loan-request/:id',
        component: LoanRequestComponent,
      },
      {
        path: 'net-worth/:id',
        component: NetWorthComponent,
      },
      {
        path: 'due-diligence/:id',
        component: ClientVistComponent,
      },
      {
        path: 'site-vist/:id',
        component: SiteVistComponent,
      },
      {
        path: 'risk-1/:id',
        component: RiskOneComponent,
      },
      {
        path: 'risk-2/:id',
        component: RiskTwoComponent,
      },
      {
        path: 'score/:id',
        // component: ScoreComponent,
        component: ScorePersonalLoanComponent,
      },
      {
        path: 'add-info/:id',
        component: AddInfoComponent,
      },
      {
        path: 'media-upload/:id',
        // component: MedisUploadComponent,
        component:MediaUploadPersonalLoanComponent
      },
      {
        path: 'report/:id',
        // component: ReportGenComponent,
        component:ReportGenPersonalLoanComponent
      },
      {
        path: 'upload-report/:id',
        component: UploadReportComponent,
      },

      {
        path: 'upload-files/:id',
        component: UFilesComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users-add',
        component: UsersAddComponent,
      },
      {
        path: 'user-update/:id',
        component: UsersAddComponent,
      },
    ],
  },
  {
    path: 'retailloan-products',
    canActivate: [AdminGuard],
    component: RetailLoanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
