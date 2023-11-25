import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Packer } from 'docx';
import { experiences, education, skills, achievements } from './cv-data';
import { DocumentCreator } from './cv-generator';
import { DocumentCreator2 } from './cv-generator2';
import { HttpClient } from '@angular/common/http';
import { SideNavComponent } from '../Components/side-nav/side-nav.component';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

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

  pdfFiles: string[] = [];

  pdf1: File | null = null;
  pdf2: File | null = null;

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

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if(params.id != null){
        localStorage.setItem("applicant1Id",params.id)
        this.openId = params.id;
        if (this.openId != 0) {
          this.getData();
          this.getPdfFiles();
          this.getSingleAppData()
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
    console.log(this.fileToUpload);
  }

  handlePdfUpload(event: any, type: 'pdf1' | 'pdf2') {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this[type] = file;
    } else {
      console.log('Invalid file type. Please upload a PDF file.');
    }
  }

  uploadPdf(type: 'pdf1' | 'pdf2') {
    const file = this[type];
  
    if (file) {
      const data = new FormData();
  
      data.append('action', 'savePdfFile'); // Adjust the action accordingly
      data.append('ref_id', this.openId);
      data.append('type', type); // You can pass the type to differentiate between pdf1 and pdf2
      data.append('file', file);
  
      this.ds.submitAppData(data).subscribe((response: any) => {
        // Handle the response as needed
        console.log(response);
  
        // Clear the selected file and perform any other necessary actions
        this[type] = null;
        this.getData();
      });
    } else {
      console.log('No file selected. Please choose a PDF file to upload.');
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
    this.router.navigateByUrl('/dashboard');
  }

  goBack() {
    // this.router.navigateByUrl('score/' + this.openId);
    this.sideNav.openPage(2, 6);
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
      const doc = documentCreator.create(response);

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
    this.router.navigateByUrl('dashboard');
  }
}
