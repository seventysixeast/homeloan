import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private route: ActivatedRoute, private ds: DataService, private cdr: ChangeDetectorRef) {}

  activeId: any = 0;
  demochange: boolean = true;
  logedInUser : any;

  ngOnInit(): void {
    // alert()
    this.activeId = localStorage.getItem('activeId');
    let id1 = localStorage.getItem('mId');
    let id2 = localStorage.getItem('smId');
    console.log("id1",id1)
    console.log("id2",id2)
    console.log("activeId",this.activeId)
    console.log("his.ds.loggedInUser======",this.ds.loggedInUser)
    console.log('this.ds.userLoggedIn()',this.ds.userLoggedIn())
    this.logedInUser = this.ds.userLoggedIn()
    // this.ds.loggedInUser.subscribe(resp =>{
    //   console.log('resp',resp)
    //   this.logedInUser =  resp;
   
    // })
    // if(id1 !=  null && id2 !=  null){
      this.openPage(Number(id1), Number(id2));
    // }
   
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit - wrapper');
    this.cdr.detectChanges();
  }

  // ngonview

  menuLinks: any = [
    {
      id: 1,
      name: 'Loan Application Data',
      trigerName: 'one',
      status: true,
      subMenuLinks: [
        {
          id: 1,
          name: 'Applicant Data 1',
          link: 'applicant-data',
          status: true,
        },
        {
          id: 11,
          name: 'Applicant Data 2',
          link: 'applicant-data2',
          status: true,
        },
        {
          id: 2,
          name: 'Guarantor Data 1',
          link: 'guarantor-data',
          status: false,
        },
        {
          id: 12,
          name: 'Guarantor Data 2',
          link: 'guarantor-data2',
          status: false,
        },
        {
          id: 3,
          name: 'Project Cost and Loan Request',
          link: 'loan-request',
          status: false,
        },
      ],
    },
    {
      id: 2,
      name: 'Loan Appraisal Data',
      trigerName: 'two',
      status: false,
      subMenuLinks: [
        {
          id: 1,
          name: 'Income and Net Worth',
          link: 'net-worth',
          status: false,
        },
        {
          id: 2,
          name: 'Client Visit Information',
          link: 'client-vist',
          status: false,
        },

        {
          id: 3,
          name: 'Site Visit Information',
          link: 'site-vist',
          status: false,
        },
        {
          id: 4,
          name: 'Personal Credentials',
          link: 'risk-1',
          status: false,
        },
        {
          id: 5,
          name: 'Credit Capacity Credetials',
          link: 'risk-2',
          status: false,
        },
        {
          id: 7,
          name: 'Proposal Information',
          link: 'add-info',
          status: false,
        },
        {
          id: 8,
          name: 'Photos / Videos Upload',
          link: 'media-upload',
          status: false,
        },
        // {
        //   id: 7,
        //   name: 'Proposal Information',
        //   link: 'add-info',
        //   status: false,
        // },
        {
          id: 6,
          name: 'Risk Assessment Report',
          link: 'score',
          status: false,
        },
        // {
        //   id: 10,
        //   name: 'Upload Report',
        //   link: 'upload-report',
        //   status: false,
        // },
        {
          id: 9,
          name: 'Report',
          link: 'report',
          status: false,
        },
        // {
        //   id: 10,
        //   name: 'Upload Files',
        //   link: 'upload-files',
        //   status: false,
        // },
      ],
    },
  ];

  public openPage(mId: number, smId: number) {
    localStorage.setItem('mId', JSON.stringify(mId));
    localStorage.setItem('smId', JSON.stringify(smId));
    this.menuLinks.map((x: any) => {
      if (x.id == mId) {
        x.status = true;
        x.subMenuLinks.map((y: any) => {
          if (y.id == smId) {
            y.status = true;
          } else {
            y.status = false;
          }
        });
      } else {
        x.status.false;
        x.subMenuLinks.map((y: any) => {
          y.status = false;
        });
      }
    });
    let applicant1Id = localStorage.getItem('applicant1Id')
    console.log('applicant1Id',applicant1Id)
    if(applicant1Id != null){
      let link: any = document.getElementById(`link${mId}${smId}`);
      link.click();
      this.ds.loggedInUser.subscribe(resp =>{
        console.log('resp 2',resp)
        this.logedInUser =  resp;
     
      })
      if(mId == 1 && smId == 1){
        if(applicant1Id){
          this.router.navigateByUrl('applicant-data/' + applicant1Id);
        }else{
          this.router.navigateByUrl('applicant-data');
        }
      }
      if(mId == 1 && smId == 11){
        this.router.navigateByUrl('applicant-data2/' + applicant1Id);
      }
  
      if(mId == 1 && smId == 2){
        this.router.navigateByUrl('guarantor-data/' + applicant1Id);
      }
  
      if(mId == 1 && smId == 12){
        this.router.navigateByUrl('guarantor-data2/' + applicant1Id);
      }
  
      if(mId == 1 && smId == 3){
        this.router.navigateByUrl('loan-request/' + applicant1Id);
      }
      if(mId == 2 && smId == 1){
        this.router.navigateByUrl('net-worth/' + applicant1Id);
      }
  
      if(mId == 2 && smId == 2){
        this.router.navigateByUrl('client-vist/' + applicant1Id);
      }
  
      if(mId == 2 && smId == 3){
        // this.router.navigateByUrl('client-vist/' + applicant1Id);
        this.router.navigateByUrl('site-vist/' + applicant1Id);
      }
  
      if(mId == 2 && smId == 4){
        this.router.navigateByUrl('risk-1/' + applicant1Id);
      }
  
      if(mId == 2 && smId == 5){
        this.router.navigateByUrl('risk-2/' + applicant1Id);
      }
  
      if(mId == 2 && smId == 7){
        this.router.navigateByUrl('add-info/' + applicant1Id);
      }
  
      if(mId == 2 && smId == 8){
        this.router.navigateByUrl('media-upload/' + applicant1Id);
      }

      if(mId == 2 && smId == 6){
        this.router.navigateByUrl('score/' + applicant1Id);
      }
      console.log('mId',mId)
      console.log('smId',smId)

      if(mId == 2 && smId == 9){
        this.router.navigateByUrl('report/' + applicant1Id);
      }
    }

    





  }


}
