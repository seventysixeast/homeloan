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

  handleSubmit() {
    this.spinner.show();
    let data = new FormData();

    data.append('f_name', this.f_name);
    data.append('l_name', this.l_name);
    data.append('email', this.email);
    data.append('password', this.password);
    data.append('type', this.type);

    data.append('action', 'addUser');
    this.ds.submitAppData(data).subscribe((response: any) => {
      this.spinner.hide();
      console.log(response);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User Added',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }
}
