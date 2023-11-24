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

    console.log('this.email',this.email)

    data.append('action', 'loginUser');
    data.append('email', this.email);
    data.append('password', this.password);

    this.ds.submitAppData(data).subscribe((response: any) => {
      this.spinner.hide();

      // let data = response;

      console.log((response));

      if (response != null) {
        console.log('response',response)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User Login',
          showConfirmButton: false,
          timer: 1500,
        });

        let user = JSON.parse(atob(response));
        console.log('user',user)
        // return;
        this.ds.userLogin(user)
        // localStorage.setItem('admin',response)
        if(user.type == "Admin"){
          localStorage.setItem('admin',response)
        }else if(user.type == "Credit-Approver"){
          localStorage.setItem('creditApprover',response)
        }else if(user.type == "Credit-Analyst"){
          localStorage.setItem('creditAnalyst',response)
        }else if(user.type == "Credit-Underwriter"){
          localStorage.setItem('creditUnderwriter',response)
        }
        // users
        // this.router.navigateByUrl('/users');
        // this.router.navigateByUrl('/dashboard');
        this.router.navigateByUrl('/retail-loan');
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
