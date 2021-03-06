import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Signup } from '../../signup';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup: Signup[] = [];
  user: Signup;
  username: string;
  name: string;
  email: string;
  contact_no: Number;
  age: Number;
  gender: string;
  password: string;
  Cnfpassword: string;
  myForm: FormGroup;


  constructor(private authservice: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private validateservice: ValidateService, private flashmessages: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      contact_no: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      Cnfpassword: ['', Validators.required],
    });
  }

  //Add the user details
  AddUserDetails() {
    const newUser = {
      name: this.myForm.value.name,
      username: this.myForm.value.username,
      email: this.myForm.value.email,
      contact_no: this.myForm.value.contact_no,
      age: this.myForm.value.age,
      gender: this.myForm.value.gender,
      password: this.myForm.value.password
    }
    var phone_length = this.myForm.value.contact_no.toString().length;
    var age_length = this.myForm.value.age;
    var password_length = this.myForm.value.password.toString().length;
    if (!this.validateservice.validateRegister(newUser)) {
      this.toastr.info('Please fill in all fields');
      return false;
    }
    if (!this.validateservice.validateEmail(newUser.email)) {
      this.toastr.info('Please fill the valid email');
      return false;
    }
    if (!this.validateservice.validatePassword(newUser.password)) {
      this.toastr.info(' Password should be [8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character]');
      return false;
    }

    if (phone_length != 10) {
      this.toastr.info('Please fill the valid Contact no.');
      return false;
    }

    if (age_length < 10 || age_length > 108) {
      this.toastr.info('Please fill the Age between 15 and 85.');
      return false;
    }
    if (this.myForm.controls.password.value != this.myForm.controls.Cnfpassword.value) {
      this.toastr.info('Password not matched');
      return false;

    }

    this.authservice.registerUser(newUser)
      .subscribe(data => {
        if (data.success) {
          this.flashmessages.show('You are now registered and can login', { cssClss: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
        }
        else {
          this.toastr.info('Something went wrong -> Username and Email should be unique');
          this.router.navigate(['/signup']);
        }
      });
  }

}
