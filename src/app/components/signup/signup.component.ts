import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Signup } from '../../signup';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup: Signup[] = [];
  user: Signup;
  username:string;
  name: string;
  email: string;
  contact_no: Number;
  age: Number;
  gender: string;
  password: string;
  Cnfpassword: string;
  myForm: FormGroup;


  constructor(private authservice: AuthService, private fb: FormBuilder, private validateservice: ValidateService, private flashmessages: FlashMessagesService,private router:Router) { }

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
      username:this.myForm.value.username,
      email: this.myForm.value.email,
      contact_no: this.myForm.value.contact_no,
      age: this.myForm.value.age,
      gender: this.myForm.value.gender,
      password: this.myForm.value.password
    }
    var phone_length = this.myForm.value.contact_no.toString().length;
    var age_length=this.myForm.value.age;
    var password_length=this.myForm.value.password.toString().length;
    if (!this.validateservice.validateRegister(newUser)) {
      this.flashmessages.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 5000 });
      console.log('please fill in all fields');
      return false;
    }
    if(!this.validateservice.validateEmail(newUser.email))
    {
      this.flashmessages.show('Please fill the valid email ',{cssClass:'alert-danger',timeout:5000});
      return false;
    }
    if(!this.validateservice.validatePassword(newUser.password))
    {
      this.flashmessages.show(' Password should be [8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character] '
      ,{cssClass:'alert-danger',timeout:5000});
      return false;
    }

    if(phone_length!=10){
      this.flashmessages.show('Please fill the valid Contact no. ',{cssClass:'alert-danger',timeout:5000});
      return false;
    }
  
    if(age_length<10 || age_length>108){
      this.flashmessages.show('Please fill the Age between 15 and 85. ',{cssClass:'alert-danger',timeout:5000});
      return false;
    }
    if(this.myForm.controls.password.value!=this.myForm.controls.Cnfpassword.value)
     {
      this.flashmessages.show('Password not matched',{cssClass:'alert-danger',timeout:5000});
      console.log('!Invalid password');
      return false;
      
     }
        
    this.authservice.registerUser(newUser)
      .subscribe(data => {
     if(data.success)
     {
       this.flashmessages.show('You are now registered and can login',{cssClss:'alert-success',timeout:3000});
       this.router.navigate(['/login']);
     }
     else
     {
       this.flashmessages.show('Something went wrong -> Username and Email should be unique',{cssClass:'alert-danger',timeout:5000});
       this.router.navigate(['/signup']);
     }
      });
  }

}
