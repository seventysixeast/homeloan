import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Packer } from 'docx';
import { experiences, education, skills, achievements } from './cv-data';
import { DocumentCreator } from './cv-generator';
import { DocumentCreator2 } from './cv-generator2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-gen',
  templateUrl: './report-gen.component.html',
  styleUrls: ['./report-gen.component.css'],
})
export class ReportGenComponent implements OnInit {
  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private Http: HttpClient
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

  pdf1: File | null = null;
  pdf2: File | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.openId = params.id;
    });
    this.getData();
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
    this.router.navigateByUrl('/');
  }

  goBack() {
    this.router.navigateByUrl('score/' + this.openId);
  }

  doc1() {
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
}
