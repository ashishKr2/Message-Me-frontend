import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
// import { Router } from '../../../../node_modules/@angular/router';
import { Message } from './message';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '../../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [AuthService]
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  message: Message;
  msg: string;
  username: string;
  // myform: FormGroup;
  // mesag:FormControl;
  uid: string;
  user: Object;
  user1: string;
  flag: boolean = false;
  count: number = 0;
  constructor(private authService: AuthService,
    private flashmessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.mesag = new FormControl('', Validators.required);

    this.uid = this.route.snapshot.params['userId'];
    const ms = {
      username: this.uid
    }
    this.authService.MessageSub(ms)
      .subscribe(message => {
        if (message.success) {
          this.flashmessages.show('User found', { cssClass: 'alert-success', timeout: 3000 });

        } else {

          this.flashmessages.show('Sorry...... User not found !', { cssClass: 'alert-danger', timeout: 3000 });
          this.router.navigate(['/home']);
        }
      })
  }

  MessageSubmit() {
    const newMsg = {
      msg: this.msg,
      username: this.uid
    }
    this.authService.MessageSubmit(newMsg)
      .subscribe(message => {
        this.messages.push(message);
        this.flashmessages.show('Successfully sent message', { cssClass: 'alert-success', timeout: 3000 });

        console.log(message);

      }
        //  this.myform.reset();

      );


  }
}

