import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private ds: DataService,
    private router: Router
  ) {}

  email = '';
  password = '';

  handleLoginSubmit() {
    this.spinner.show();
    let data = new FormData();

    data.append('action', 'loginUser');
    data.append('email', this.email);
    data.append('password', this.password);

    this.ds.submitAppData(data).subscribe((response: any) => {
      this.spinner.hide();

      let data = response;

      console.log(data);

      if (data != null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User Login',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigateByUrl('/dashbord');
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Invalid User',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
}
