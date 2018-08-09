import { Component, OnInit } from '@angular/core';
import { AuthService } from '.././../services/auth.service';
import {Message} from '../message/message';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[AuthService]
})
export class DashboardComponent implements OnInit {
  user:Object;
  messages:Message[]=[];
  message:Message;
  msg:string;
  constructor(private authservice:AuthService) { }

  ngOnInit() {
    this.authservice.getProfile().subscribe(profile=>{
      this.user=profile.user;
    },
    err=>{
      console.log(err);
      return false;
    });
    
//  ************ getting message
    this.authservice.getMessage()
    .subscribe(messages=>
      this.messages=messages);      
  }
  deleteMessage(id:any){
    var messages=this.messages;
    this.authservice.deleteMessage(id)
    .subscribe(data=>{
      if(data.n==1){
        for(var i=0; i< messages.length; i++)
        {
          if(messages[i]._id==id)
          {
            messages.splice(i,1);
          }
        }
      }
    })
  }

}
