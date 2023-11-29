import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';
import { SideNavComponent } from '../../Components/side-nav/side-nav.component';

@Component({
  selector: 'app-medis-upload',
  templateUrl: './medis-upload.component.html',
  styleUrls: ['./medis-upload.component.css'],
  providers: [SideNavComponent],
})
export class MedisUploadComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private spiner: NgxSpinnerService,
    private sideNav: SideNavComponent
  ) {}

  filename: any = '';
  fileToUpload: any;
  typeList: any = [
    { id: 0, name: 'Select Purpose' },
    { id: 1, name: 'Property Photo' },
    { id: 2, name: 'Property Video' },
    // { id: 3, name: 'NRC Copy' },
    // { id: 4, name: 'Other' },
  ];

  showImageLink: any = '';
  showVideoLink: any = '';

  type: any = 0;
  openId: any = 0;
  comment: any = '';

  medialist: any = [];

  logedInUser : any;
  userId = "";
  status = "";
  submitButtonText = "";
  viewOnly: any = false;
  nextButtonText: any = "";

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if(params.id != null){
        localStorage.setItem("applicant1Id",params.id)
        this.openId = params.id;
        this.getData();
        this.getSingleAppData()
       
      }
    });
    // this.getData();

    // else if(this.logedInUser.type == "Admin" && ((status.indexOf("Processing by Admin") > -1))){
    //   // return "Processing by Admin";
    //   this.submitButtonText = "Submit"
    // }
  }

  getData() {
    let data = new FormData();
    data.append('action', 'getMediaFile');
    data.append('id', this.openId);

    this.ds.submitAppData(data).subscribe((response: any) => {
      if(response != null){
        response.map((x: any) => {
          this.typeList.map((y: any) => {
            if (x.type == y.id) {
              x.typeName = y.name;
            }
          });
        });
        console.log('response',response)
        this.medialist = response;
      }else{
        this.medialist = [];
      }
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

        this.logedInUser = this.ds.userLoggedIn()
        let checkView = localStorage.getItem("viewOnly")
        console.log('this.status',this.status)
        if(checkView === 'true'){
          this.viewOnly =  true;
          this.nextButtonText = "Next"
        }else{
          // this.nextButtonText = "Save And Next"
          if(this.logedInUser.type == "Credit-Analyst"){
      
            this.nextButtonText = "Submit"
           
          }else if(this.logedInUser.type == "Credit-Underwriter"){
            this.nextButtonText = "Save & Next"
          }else if(this.logedInUser.type == "Credit-Approver"){
            // return  "Reveiwing by Credit Approver("+this.logedInUser.f_name +")";
            this.nextButtonText = "Save & Next"
          }else if(this.logedInUser.type == "Admin" && (this.status.indexOf("Reveiwing by Admin") > -1)){
            // console.log('this.status',this.status)
            this.nextButtonText = "Save & Next"
            // return "Reveiwing by Admin";
          }
        }
      }
    });
  }

  handleFileInput(files: any) {
    this.fileToUpload = files.files.item(0);

    console.log('fileToUpload',this.fileToUpload)
    console.log('this.type',this.type)

    if(this.type == 0){
      alert('Please Any options of Select Purpose')
      return;
    }
    
    var size = parseFloat(files.files.item(0).size);
    const fileSize = Math.round((size / 1024));
    if (fileSize > 16384) {
      alert('File size exceeds 16 mb');
      return;
    } 
   
    this.spiner.show();

    let data = new FormData();

    data.append('action', 'saveMediaFile');
    data.append('ref_id', this.openId);
    data.append('type', this.type);
    data.append('comment', this.comment);
    data.append('file', files.files.item(0));
    // data.append('status', "media-upload");
    // data.append('status', "Submitted-by-Admin");

    this.ds.submitAppData(data).subscribe((response: any) => {
      this.spiner.hide();
      this.type = 0;
      this.filename = '';
      this.comment = '';
      this.getData();
    });
  }

  handleSubmit() {
    if(this.viewOnly){
      this.goNext();
      return;
    }
    this.spiner.show();
    // this.spiner.hide();

    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'success',
    //   // title: 'Your work has been saved',
    //   title: 'Application Submitted',
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    let data = new FormData();

    data.append('action', 'submit-all-forms');
    data.append('ref_id', this.openId);
    if(this.logedInUser.type == "Credit-Analyst"){
      // return ("Processing by Credit Analyst("+this.logedInUser.f_name +")");
      data.append('status', "Submitted by Credit Analyst("+this.logedInUser.f_name +")");
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
    }else if(this.logedInUser.type == "Credit-Underwriter"){
      // return ("Reveiwing by Credit Underwriter("+this.logedInUser.f_name  +")");
      // data.append('action', 'submit-all-forms');
      // data.append('ref_id', this.openId);
      data.append('status', "Reveiwing by Credit Underwriter("+this.logedInUser.f_name  +")");
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
      // Swal.fire({
      //   position: 'top-end',
      //   icon: 'success',
      //   title: 'Your work has been saved',
      //   // title: 'Application Submitted',
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
    }else if(this.logedInUser.type == "Credit-Approver"){
      // data.append('action', 'submit-all-forms');
      // data.append('ref_id', this.openId);
      data.append('status', "Reveiwing by Credit Approver("+this.logedInUser.f_name  +")");
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
      // return  "Reveiwing by Credit Approver("+this.logedInUser.f_name +")";
    }else if(this.logedInUser.type == "Admin" && (this.status.indexOf("Reveiwing by Admin") > -1)){
      // return "Reveiwing by Admin";
      data.append('status', "Reveiwing by Admin");
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
    }else if(this.logedInUser.type == "Admin" && ((this.status.indexOf("Processing by Admin") > -1))){
      // return "Processing by Admin";
      data.append('action', 'submit-all-forms');
      data.append('ref_id', this.openId);
      data.append('status', "Submitted by Admin");
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
    }

    // if((this.logedInUser.type == "Admin" && this.userId == '' ) || ){

    // }

    // data.append('action', 'submit-all-forms');
    // data.append('ref_id', this.openId);
    // data.append('status', "Submitted-by-Admin");
    // this.ds.submitAppData(data).subscribe((response: any) => {
    //   this.spiner.hide();

    //   Swal.fire({
    //     position: 'top-end',
    //     icon: 'success',
    //     title: 'Application Submitted',
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    //   this.goNext();
    //   // console.log(response);
    // });

    // this.goNext();
  }

  showImg(data: any) {
    if (this.isImage(data.filename) == true) {
      this.showImageLink = this.ds.mediaUrl + data.filename;
      this.showVideoLink = ''
    } else {
      this.showVideoLink = this.ds.mediaUrl + data.filename;
      this.showImageLink = ''
    }
  }

  isImage(url: any) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  deleteImg(MediaItem: any) {

    Swal.fire({
      title: 'Do you want to delete the image?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: 'Cancel',
      customClass: {
        actions: 'my-actions',
        // cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
        // return;
        let data = new FormData();

        data.append('action', 'deleteMediaFile');
        data.append('id', MediaItem.id);

        this.ds.submitAppData(data).subscribe((response: any) => {
          if (response == 1) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Image Is Deleted Successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            // this.getData();
            this.showImageLink = '';
            this.getData();
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'Something went wrong',
              showConfirmButton: false,
              timer: 1500,
            });
          }
          
        });
        
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }

  goNext() {
    // this.router.navigateByUrl('report/' + this.openId);
    // this.sideNav.openPage(2, 7);
    this.sideNav.openPage(2, 6);
  }
  goBack() {
    // this.router.navigateByUrl('risk-2/' + this.openId);
    this.sideNav.openPage(2, 7);
  }
}
