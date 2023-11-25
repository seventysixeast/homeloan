import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SideNavComponent } from 'src/app/Components/side-nav/side-nav.component';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css'],
  providers: [SideNavComponent],
})
export class UsersAddComponent {
  constructor(
    public ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sideNav: SideNavComponent
  ) {}

  f_name = '';
  l_name = '';
  email = '';
  password = '';
  type = '0';
  edit = false;
  id = "0";


  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if(params.id){
        this.getUser(params.id);
      }
    });
    // console.log('this.type',this.type)
  }

  getUser(id: any){
    let data2 = new FormData();
    this.id = id;
    data2.append('id', id);
    data2.append('action', 'getUser');
    this.ds.submitAppData(data2).subscribe((response2: any) => {
      console.log('response2',response2[0].type)
      if (response2 && response2.length != 0) {
        this.f_name = response2[0].f_name
        this.l_name = response2[0].l_name
        this.email = response2[0].email
        this.password = response2[0].password
        this.type = response2[0].type
        this.edit =  true;
      }else{
        this.edit =  false;
      }
    });

    console.log('this.type',this.type)
  }

  handleSubmit() {
    this.spinner.show();
    let data = new FormData();

    data.append('f_name', this.f_name);
    data.append('l_name', this.l_name);
    data.append('email', this.email);
    data.append('password', this.password);
    data.append('type', this.type);

    if(this.edit){
      data.append('id', this.id);
      data.append('action', 'updateUser');
    }else{
      data.append('action', 'addUser');
    }

    this.ds.submitAppData(data).subscribe((response: any) => {
      this.spinner.hide();
      console.log(response);
      if(response == 1){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User Added',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl('/users');
      }

    });
  }
}