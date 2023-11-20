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
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: 'dashbord',
        component: DashbordComponent,
      },
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
