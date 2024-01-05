import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Packer } from 'docx';
// import { experiences, education, skills, achievements } from './cv-data';
import { experiences } from '../report-gen/cv-data';
import { DocumentCreator } from '../report-gen/cv-generator';
import { DocumentCreator2 } from '../report-gen/cv-generator2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SideNavComponent } from '../Components/side-nav/side-nav.component';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report-gen-personal-loan',
  templateUrl: './report-gen-personal-loan.component.html',
  styleUrls: ['./report-gen-personal-loan.component.css'],
  providers: [SideNavComponent],
})
export class ReportGenPersonalLoanComponent {
  constructor(
    public ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private Http: HttpClient,
    private sideNav: SideNavComponent,
    private spiner: NgxSpinnerService,
  ) { }

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

  logedInUser: any;
  userId = "";
  status = "";
  viewOnly: any = false;
  nextButtonText: any = "";
  showUploadButton: any = false;
  submitButtonForAdmin = false;
  showButtonForApprover = false;
  showDownloadButton = false;
  showStatusButton = false;
  imageBlob1: any = '';
  imageBlob2: any = '';
  imageBlob3: any = '';
  imageBlob4: any = '';
  imageMediaBlob: any = [];

  displayStyle = "none";
  displayStyleProposal = "none";

  dataJson1:any;
  dataOfBank:any;
  dataOfapp:any;

  dataJson2:any;
  dataJson3:any;
  dataJson4:any;
  dataJson4ForAddInfo:any;
  dataJson5:any;
  safetyScore:any = "";

  netData:any;
  url1:any = "";

  url3:any = "";
  url4:any = "";

  mediaUrls:any = [];
  @ViewChild('pdfTable', {static: false}) pdfTable!: ElementRef;
  @ViewChild('pdfTableProposal', {static: false}) pdfTableProposal!: ElementRef;

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id != null) {
        localStorage.setItem("applicant1Id", params.id)
        this.openId = params.id;
        if (this.openId != 0) {
          this.getData();
          this.getPdfFiles();
          this.getSingleAppData()
          // this.getImageBefore()
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

  
  inWords (num:any) {
      var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
      var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
      if ((num = num.toString()).length > 9) return 'overflow';
      var n:any = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return; var str = '';
      str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
      str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
      str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
      return  str.charAt(0).toUpperCase() + str.slice(1);
  }

  getSingleAppData() {
    let data = new FormData();

    data.append('id', this.openId);
    data.append('action', 'getSingleData');

    this.ds.submitAppData(data).subscribe((response: any) => {
      if (response != null) {
        this.status = response[0].status;
        this.userId = response[0].userId;
        // console.log('this.status',this.status)
        this.logedInUser = this.ds.userLoggedIn()
        let checkView = localStorage.getItem("viewOnly")
        if (checkView === 'true') {
          this.viewOnly = true;
          this.nextButtonText = "Next"
          if (this.logedInUser.type == "Credit-Approver" && (this.status.indexOf("Reveiwing by Credit Approver") > -1)) {
            this.showButtonForApprover = true;
            this.showUploadButton = true;
            // return  "Reveiwing by Credit Approver("+this.logedInUser.f_name +")";
            // this.nextButtonText = "Save & Next"
          }

          // this.showUploadButton = true;
        } else {
          // this.nextButtonText = "Save And Next"
          if (this.logedInUser.type == "Credit-Analyst") {

            this.nextButtonText = "Submit"

          } else if (this.logedInUser.type == "Credit-Underwriter") {
            this.nextButtonText = "Save & Next"
          } else if (this.logedInUser.type == "Credit-Approver") {
            this.showButtonForApprover = true;
            // return  "Reveiwing by Credit Approver("+this.logedInUser.f_name +")";
            // this.nextButtonText = "Save & Next"
          } else if (this.logedInUser.type == "Admin" && (this.status.indexOf("Reveiwing by Admin") > -1)) {
            // this.nextButtonText = "Save & Next"
            this.submitButtonForAdmin = true;
            // this.showUploadButton = true;
            // return "Reveiwing by Admin";
          }
        }

        if ((this.status.indexOf("Submitted by Admin") > -1) || this.status.indexOf("Reveiwing by Admin") > -1 || this.status.indexOf("Reveiwing by Credit Approver") > -1 || this.status.indexOf("Approved by Credit Approver") > -1 || this.status.indexOf("Rejected by Credit Approver") > -1) {

          this.showDownloadButton = true;
        }

        if (this.status.indexOf("Approved by Credit Approver") > -1 || this.status.indexOf("Rejected by Credit Approver") > -1) {
          this.showStatusButton = true
        }
      }
    });

    let data1 = new FormData();
    

    data1.append('action', 'getDoc1Data');
    data1.append('id', this.openId);

    this.ds.submitAppData(data1).subscribe((response: any) => {
      const documentCreator = new DocumentCreator();
      console.log('response',response)
      // response.mediaUrl = this.ds.mediaUrl;
      this.netData = response;

      if(response.app_data.a1_photo != ""){
        this.url1 = this.ds.mediaUrl + response.app_data.a1_photo;
      }

      if(response.guar_data.a1_photo != ""){
        this.url3 = this.ds.mediaUrl + response.guar_data.a1_photo;
      }
      if(response.guar_data.a2_photo != ""){
        this.url4 = this.ds.mediaUrl + response.guar_data.a2_photo;
      }

      for (let i = 0; i < 4; i++) {
        if(response.media[i]){
          let medUrl = this.ds.mediaUrl + response.media[i].filename
          this.mediaUrls.push(medUrl)
        }else{
          this.mediaUrls.push("")
        }
        // let blobMedia = await fetch(
        //   medUrl
        // ).then(r =>
        //   (r.blob())
        // );
        // // console.log('blob2',blob2)
        // if (blobMedia.size > 0 && blobMedia.type != 'text/html') {
        //   // this.imageBlob4 = blob4
        // }
        // this.mediaUrls.push(medUrl)
      }
      // this.mediaUrls = response.media;
      console.log('this.netData',this.netData)
      console.log('this.mediaUrls',this.mediaUrls)
      // return;
      // const doc = documentCreator.create(response, this.imageBlob1, this.imageBlob2);
      this.dataJson1 = JSON.parse(response.loan_request.dataJson);
      this.dataOfBank = JSON.parse(response.addinfo.JsonData);
      this.dataOfapp = (response.app_data);

      this.dataJson2 = JSON.parse(response.risk_one.JsonData);
      this.dataJson3 = JSON.parse(response.risk_two.JsonData);
      this.dataJson4 = JSON.parse(response.addinfo.JsonData);
      this.dataJson4ForAddInfo = (response.addinfo);
      this.dataJson5 = (response.score);


      let score = this.dataJson2.mws_total + this.dataJson3.mws_total + JSON.parse(this.dataJson5.m_score)

      this.dataJson5.m_score = JSON.parse(this.dataJson5.m_score)
      this.dataJson5.total2 = JSON.parse(this.dataJson5.total2)

      console.log('this.score', score)
      // let safetyScore = '';
      if (score >= 80) {
        this.safetyScore = 'High';
      } else if (score >= 70 && score < 80) {
        this.safetyScore = 'Good';
      } else if (score >= 60 && score < 70) {
        this.safetyScore = 'Moderate';
      } else if (score >= 50 && score < 60) {
        this.safetyScore = 'Average';
      } else {
        this.safetyScore = 'Poor';
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
    // this.goNext();
    window.location.href = 'personal-vehicle-loan/dashboard';
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

  uploadPdfForPersonalLoan(type: any, file:any){
    const data = new FormData();

      data.append('action', 'savePdfFile');
      data.append('ref_id', this.openId);
      data.append('type', type);
      data.append('file', file);

      this.ds.submitAppData(data).subscribe((response: any) => {
        // console.log(response);

        // Handle the response message
        if (response.success) {
          // console.log("File saved successfully");
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

        this.closePopup();
        this.closePopupForLoanProposal();

        // Clear the selected file and perform any other necessary actions
        this.getData();
      });
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
    // console.log(data.filename);
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

  async doc1() {

    // console.log('sta',this.status)
    if (this.status.indexOf('Processing by Credit Analyst') > -1) {
      alert('Being Filled by Credit Analyst')
      return;
    }

    // required
   
    const DATA = this.pdfTable.nativeElement;
    // const doc: jsPDF = new jsPDF("p", "mm", "a4");
    const doc: jsPDF = new jsPDF("p", "pt", "a3");
  
    // doc.setFontSize(5)
    doc.html(DATA, {
      html2canvas: {
        scale: 1,
      },
      callback: (doc) => {
        // var temp = doc.save("Loan_Application.pdf");
        var temp = doc.output('blob');
        this.uploadPdfForPersonalLoan("application",temp)
      }
    });

    // required

      // var chartContainer = document.getElementById('pdfTable');
      // if(chartContainer){
      //   console.log('chartContainer.children',chartContainer.children)
      //   if (!chartContainer) {
      //       console.error("Element with ID 'chart_pdf' not found.");
      //       return;
      //   }
      //   var pageWrappers = Array.from(chartContainer.children);
    
      //   if (pageWrappers.length === 0) {
      //       console.warn("No child elements found inside 'chart_pdf'.");
      //       return;
      //   }
    
      //   var doc = new jsPDF('p', 'mm');

      //   console.log('pageWrappers.children',pageWrappers)
    
      //   for (var i = 0; i < pageWrappers.length; i++) {
      //       var pageWrapper = pageWrappers[i];
      //       var canvas = await html2canvas(pageWrapper as HTMLElement, {
      //           scale: 1,
      //           backgroundColor: 'white',
      //           useCORS: true,
      //           allowTaint: true,
      //           // proxy: true,
      //           proxy: 'anonymous',
      //           // letterRendering: true
      //       });
      //       var imgData = canvas.toDataURL('image/png');
      //       if(!imgData){
      //           var imgData = canvas.toDataURL('image/jpeg');
      //       }
      //       var imgWidth = 210;
      //       var pageHeight = 295;
      //       var imgHeight = canvas.height * imgWidth / canvas.width;
      //       var position = 0;
    
      //       if (i !== 0) {
      //           doc.addPage();
      //       }
      //       doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      //   }
    
      //   doc.save("chart_reports.pdf");
      // }
    
  }

  openPopup(){
    this.displayStyle = "block"; 
  }

  closePopup() { 
    this.displayStyle = "none"; 
  } 

  openPopupForLoanProposal(){
    this.displayStyleProposal = "block"; 
  }

  closePopupForLoanProposal() { 
    this.displayStyleProposal = "none"; 
  } 

  doc2() {
    if (this.status.indexOf('Processing by Credit Analyst') > -1) {
      alert('Being Filled by Credit Analyst')
      return;
    }
    let data = new FormData();

    data.append('action', 'getDoc1Data');
    data.append('id', this.openId);

    this.ds.submitAppData(data).subscribe((response: any) => {
      const DATA = this.pdfTableProposal.nativeElement;
      // const doc: jsPDF = new jsPDF("p", "mm", "a4");
      const doc: jsPDF = new jsPDF("p", "pt", "a3");
    
      // doc.setFontSize(5)
      doc.html(DATA, {
        callback: (doc) => {
          // var temp = doc.save("Loan_proposal.pdf");
          var temp = doc.output('blob');
          this.uploadPdfForPersonalLoan("proposal",temp)
        }
      });
    });
  }

  saveAsBlob(data: any, name: any) {
    const anchor = document.createElement('a');
    anchor.download = name;
    anchor.href = (window.webkitURL || window.URL).createObjectURL(data);
    anchor.click();
  }

  submitStatus(status: any) {
    this.spiner.show();
    let data = new FormData();
    if (this.logedInUser.type == "Admin") {
      if (this.pdfFiles.length < 2) {
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
    if (this.logedInUser.type == "Credit-Approver") {
      data.append('action', 'submit-all-forms');
      data.append('ref_id', this.openId);
      if (status == "Approved") {
        data.append('status', "Approved by Credit Approver (" + this.logedInUser.f_name + ")");
      } else if (status == "Rejected") {
        data.append('status', "Rejected by Credit Approver (" + this.logedInUser.f_name + ")");
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
