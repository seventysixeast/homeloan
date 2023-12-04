import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Packer } from 'docx';
import { experiences, education, skills, achievements } from './cv-data';
import { DocumentCreator } from './cv-generator';
import { DocumentCreator2 } from './cv-generator2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SideNavComponent } from '../Components/side-nav/side-nav.component';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-report-gen',
  templateUrl: './report-gen.component.html',
  styleUrls: ['./report-gen.component.css'],
  providers: [SideNavComponent],
})
export class ReportGenComponent implements OnInit {
  constructor(
    public ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private Http: HttpClient,
    private sideNav: SideNavComponent,
    private spiner: NgxSpinnerService,
  ) {}

  filename: any = '';
  fileToUpload: any;
  typeList: any = [
    { id: 0, name: 'Select Purpose' },
    { id: 1, name: 'Property Photo' },
    { id: 2, name: 'Property Video' },
    { id: 3, name: 'NRC Copy' },
    { id: 4, name: 'Other' },
  ];

  showImageLink: any = '';

  type: any = 0;
  openId: any = 0;
  comment: any = '';

  medialist: any = [];

  pdfFiles: any[] = [];

  application: File | null = null;
  proposal: File | null = null;

  logedInUser : any;
  userId = "";
  status = "";
  viewOnly: any = false;
  nextButtonText: any = "";
  showUploadButton: any =  false;
  submitButtonForAdmin =  false;
  showButtonForApprover = false;
  showDownloadButton =  false;
  showStatusButton =  false;
  imageBlob1: any = '';
  imageBlob2: any = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if(params.id != null){
        localStorage.setItem("applicant1Id",params.id)
        this.openId = params.id;
        if (this.openId != 0) {
          this.getData();
          this.getPdfFiles();
          this.getSingleAppData()
          this.getImageBefore()
        }
      }
      // this.openId = params.id;
    });
   
    // this.getData();
    // this.getPdfFiles();
  }

  getData() {
    let data = new FormData();
    data.append('action', 'getMediaFile');
    data.append('id', this.openId);

    this.ds.submitAppData(data).subscribe((response: any) => {
      response.map((x: any) => {
        this.typeList.map((y: any) => {
          if (x.type == y.id) {
            x.typeName = y.name;
          }
        });
      });
      this.medialist = response;
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
        console.log('this.status',this.status)
        this.logedInUser = this.ds.userLoggedIn()
        let checkView = localStorage.getItem("viewOnly")
        if(checkView === 'true'){
          this.viewOnly =  true;
          this.nextButtonText = "Next"
          if(this.logedInUser.type == "Credit-Approver" && (this.status.indexOf("Reveiwing by Credit Approver") > -1)){
            this.showButtonForApprover = true;
            // return  "Reveiwing by Credit Approver("+this.logedInUser.f_name +")";
            // this.nextButtonText = "Save & Next"
          }

          // this.showUploadButton = true;
        }else{
          // this.nextButtonText = "Save And Next"
          if(this.logedInUser.type == "Credit-Analyst"){
      
            this.nextButtonText = "Submit"
           
          }else if(this.logedInUser.type == "Credit-Underwriter"){
            this.nextButtonText = "Save & Next"
          }else if(this.logedInUser.type == "Credit-Approver"){
            this.showButtonForApprover = true;
            // return  "Reveiwing by Credit Approver("+this.logedInUser.f_name +")";
            // this.nextButtonText = "Save & Next"
          }else if(this.logedInUser.type == "Admin" && (this.status.indexOf("Reveiwing by Admin") > -1)){
            // this.nextButtonText = "Save & Next"
            this.submitButtonForAdmin = true;
            this.showUploadButton = true;
            // return "Reveiwing by Admin";
          }
        }

        if((this.status.indexOf("Submitted by Admin") > -1) || this.status.indexOf("Reveiwing by Admin") > -1 || this.status.indexOf("Reveiwing by Credit Approver") > -1 || this.status.indexOf("Approved by Credit Approver") > -1 || this.status.indexOf("Rejected by Credit Approver") > -1){

          this.showDownloadButton =  true;
        }

        if(this.status.indexOf("Approved by Credit Approver") > -1 || this.status.indexOf("Rejected by Credit Approver") > -1){
          this.showStatusButton = true
        }
      }
    });
  }

  handleFileInput(files: any) {
    this.fileToUpload = files.files.item(0);

    let data = new FormData();

    data.append('action', 'saveMediaFile');
    data.append('ref_id', this.openId);
    data.append('type', this.type);
    data.append('comment', this.comment);
    data.append('file', files.files.item(0));

    this.ds.submitAppData(data).subscribe((response: any) => {
      this.type = 0;
      this.filename = '';
      this.comment = '';
      this.getData();
    });
  }

  handleSubmit() {
    this.goNext();
    window.location.href = 'homeloan/dashboard';
    // console.log(this.fileToUpload);
  }

  handlePdfUpload(event: any, type: 'application' | 'proposal') {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this[type] = file;
    } else {
      console.log('Invalid file type. Please upload a PDF file.');
    }
  }

  uploadPdf(type: 'application' | 'proposal') {
    const file = this[type];

    if (file) {
        const data = new FormData();

        data.append('action', 'savePdfFile');
        data.append('ref_id', this.openId);
        data.append('type', type);
        data.append('file', file);

        this.ds.submitAppData(data).subscribe((response: any) => {
            console.log(response);

            // Handle the response message
            if (response.success) {
                console.log("File saved successfully");
                this.getPdfFiles();
                Swal.fire({
                     position: 'top-end',
                     icon: 'success',
                     title: 'File Saved',
                     showConfirmButton: false,
                     timer: 1500,
                });
            } else {
                console.error("File save failed:", response.message);
                Swal.fire({
                     icon: 'error',
                     title: 'Oops...',
                     text: 'File save failed',
                });
            }

            // Clear the selected file and perform any other necessary actions
            this[type] = null;
            this.getData();
        });
    } else {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No file selected. Please choose a PDF file to upload.',
      });
    }
}


  getPdfFiles() {
    let data = new FormData();
    data.append('action', 'getPdfFiles');
    data.append('ref_id', this.openId);

    this.ds.submitAppData(data).subscribe((response: any) => {
      this.pdfFiles = response;
    });
  }

  downloadPdf(pdfFile: string) {
    const url = this.ds.mediaUrl + pdfFile;
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.download = pdfFile;
    anchor.click();
  }
  

  showImg(data: any) {
    console.log(data.filename);
    this.showImageLink = this.ds.mediaUrl + data.filename;
  }

  deleteImg(MediaItem: any) {
    let data = new FormData();

    data.append('action', 'deleteMediaFile');
    data.append('id', MediaItem.id);

    this.ds.submitAppData(data).subscribe((response: any) => {
      this.showImageLink = '';
      this.getData();
    });
  }

  goNext() {
    this.router.navigateByUrl('homeloan/dashboard');
  }

  goBack() {
    // this.router.navigateByUrl('score/' + this.openId);
    this.sideNav.openPage(2, 6);
  }

  getImageBefore(){
    let data = new FormData();
    data.append('action', 'getDoc1Data');
    data.append('id', this.openId);

    this.ds.submitAppData(data).subscribe(async(response: any) => {
      // const documentCreator = new DocumentCreator();
      // console.log('response',response)
      // response.mediaUrl = this.ds.mediaUrl;
      console.log('response',response)
      console.log('this.ds.mediaUrl + response.app_data.a1_photo',this.ds.mediaUrl + response.app_data.a1_photo)
      let url1 = this.ds.mediaUrl + response.app_data.a1_photo
      let url2 = this.ds.mediaUrl + response.app_data.a2_photo
      try {
        // let blob1 = await fetch(
        //   url1, { mode: 'no-cors'}
        //   );
        const headerDict = {
          'Content-Type': 'application/pdf',
          // 'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Authorization, X-Requested-With, Content-Type, Origin, Accept, X-clientid, X-locale, X-loggedin, X-version',
          'Access-Control-Allow-Credentials': true
        }

        // const requestOptions = {
        //   headers: new Headers(headerDict), responseType: ResponseContentType.Blob
        // };

        // const proxyurl = "https://cors-anywhere.herokuapp.com/";

        // let blob1 = this.Http.get(url1,{ headers: new HttpHeaders({
        // // 'Authorization': 'Basic ' + encodedAuth,
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/octet-stream',
        // }), responseType: 'blob'}).subscribe(
        //   res => {
        //     // const data: Blob = new Blob([res.blob()], { type: 'application/pdf' });
        //     return res;
        //     // saveAs(data, fileNAme);
        // })
        // let blob1 = await this.Http.get(url1, { responseType: 'blob' }).subscribe(result => {
        //   console.log(result);
        //   return result;
        // });
        // "https://raw.githubusercontent.com/dolanmiu/docx/master/demo/images/cat.jpg"
        const blob1 = await fetch(
          url1
        ).then(r => 
          (r.blob())
        ); 
        console.log('blob1',blob1)
        if(blob1.size > 0){
          this.imageBlob1 = blob1
        }

        const blob2 = await fetch(
          url2
        ).then(r => 
          (r.blob())
        ); 
        console.log('blob2',blob2)
        if(blob2.size > 0){
          this.imageBlob2 = blob2
        }
      }catch (error) {
        console.error('Error:', error);
      }
      // return;
      // const doc = documentCreator.create(response);

      // Packer.toBlob(doc).then((blob) => {
      //   this.saveAsBlob(blob, 'Loan_Application.docx');
      //   console.log('Document created successfully');
      // });
    });
  }

  doc1() {

    // console.log('sta',this.status)
    if(this.status.indexOf('Processing by Credit Analyst') > -1){
      alert('Being Filled by Credit Analyst')
      return;
    }
    let data = new FormData();

    data.append('action', 'getDoc1Data');
    data.append('id', this.openId);

    this.ds.submitAppData(data).subscribe((response: any) => {
      const documentCreator = new DocumentCreator();
      // console.log('response',response)
      response.mediaUrl = this.ds.mediaUrl;
      // return;
      const doc = documentCreator.create(response, this.imageBlob1, this.imageBlob2);

      Packer.toBlob(doc).then((blob) => {
        this.saveAsBlob(blob, 'Loan_Application.docx');
        console.log('Document created successfully');
      });
    });
  }

  doc2() {
    if(this.status.indexOf('Processing by Credit Analyst') > -1){
      alert('Being Filled by Credit Analyst')
      return;
    }
    let data = new FormData();

    data.append('action', 'getDoc1Data');
    data.append('id', this.openId);

    this.ds.submitAppData(data).subscribe((response: any) => {
      const documentCreator = new DocumentCreator2();
      const doc = documentCreator.create(response);

      Packer.toBlob(doc).then((blob) => {
        this.saveAsBlob(blob, 'Loan_Proposal.docx');
        console.log('Document created successfully');
      });
    });
  }

  saveAsBlob(data: any, name: any) {
    const anchor = document.createElement('a');
    anchor.download = name;
    anchor.href = (window.webkitURL || window.URL).createObjectURL(data);
    anchor.click();
  }

  submitStatus(status: any){
    this.spiner.show();
    let data = new FormData();
    if(this.logedInUser.type == "Admin"){
      if(this.pdfFiles.length < 2){
        Swal.fire({
          icon: 'error',
          title: 'failed...',
          text: 'Both pdf files need to be uploaded before submit',
      });
      return;
      }
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
        // this.router.navigateByUrl('dashboard');
        // this.goNext();
        // console.log(response);
      });
    }
    if(this.logedInUser.type == "Credit-Approver"){
      data.append('action', 'submit-all-forms');
      data.append('ref_id', this.openId);
      if(status == "Approved"){
        data.append('status', "Approved by Credit Approver ("+this.logedInUser.f_name  +")");
      }else if(status == "Rejected"){
        data.append('status', "Rejected by Credit Approver ("+this.logedInUser.f_name  +")");
      }
      this.ds.submitAppData(data).subscribe((response: any) => {
        this.spiner.hide();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Application Submitted',
          showConfirmButton: false,
          timer: 1500,
        });
        // this.goNext();
        // console.log(response);
      });
    }
    this.router.navigateByUrl('homeloan/dashboard');
  }
}
