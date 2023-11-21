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

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if(params.id != null){
        localStorage.setItem("applicant1Id",params.id)
        this.openId = params.id;
        this.getData();
      }
    });
    // this.getData();
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
    this.spiner.show();
    this.fileToUpload = files.files.item(0);

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
    data.append('status', "Submitted-by-Admin");
    this.ds.submitAppData(data).subscribe((response: any) => {
      this.spiner.hide();

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Application Submitted',
        showConfirmButton: false,
        timer: 1500,
      });
      this.goNext();
      // console.log(response);
    });

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
    let data = new FormData();

    data.append('action', 'deleteMediaFile');
    data.append('id', MediaItem.id);

    this.ds.submitAppData(data).subscribe((response: any) => {
      this.showImageLink = '';
      this.getData();
    });
  }

  goNext() {
    // this.router.navigateByUrl('report/' + this.openId);
    // this.sideNav.openPage(2, 7);
  }
  goBack() {
    // this.router.navigateByUrl('risk-2/' + this.openId);
    this.sideNav.openPage(2, 7);
  }
}
