import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '../../../../node_modules/@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  user: Object;
  constructor(private authservice: AuthService,
    private validateservice: ValidateService,
    private flashmessages: FlashMessagesService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    if (this.authservice.checkStorage() == false) {
      const user = {
        email: this.email,
        password: this.password
      }

      this.authservice.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.router.navigate(['/dashboard']);
      },
        err => {
          console.log(err);
          return false;
        });

    }

  }
  LoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }
    this.authservice.authenticateuser(user).subscribe(data => {
      if (data.success) {
        this.authservice.storeUserData(data.token, data.user);
        this.flashmessages.show('Now you are loggedIn', { cssClass: 'alert-success', timeout: 3000 });
        this.authservice.getProfile().subscribe(profile => {
          this.user = profile.user;

          this.router.navigate(['/dashboard']);
        },
          err => {
            console.log(err);
            return false;
          });
      }
      else {
        this.toastr.info('Check again username or password');
        this.router.navigate(['/login']);
      }
    });
  }
}

