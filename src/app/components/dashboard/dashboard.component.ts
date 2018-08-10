import { Component, OnInit } from '@angular/core';
import { AuthService } from '.././../services/auth.service';
import {Message} from '../message/message';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';
import { log } from 'util';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[AuthService]
})
export class DashboardComponent implements OnInit {
  user:Object;
  user1:String;
  messages:Message[]=[];
  message:Message;
  msg:string;
  username:string;
  constructor(private authservice:AuthService,private router:ActivatedRoute) { }
  async ngOnInit() {
    // this.router.paramMap.subscribe(params=>{
    //   this.username = params.get('username');
   // })
     this.authservice.getProfile().subscribe(profile=>{
      this.user=profile.user;
      this.user1=profile.user.username

    this.authservice.getMessage()
    .subscribe(messages=>{
      for(let i=0;i<messages.length;i++){
      if( this.user1==messages[i].username)
      {
      this.messages.push(messages[i]);
    }}
      
      
    });  

    },
    err=>{
      console.log(err);
      return false;
    });
    
//  ************ getting message
    // this.authservice.getMessage()
    // .subscribe(messages=>{
    //   for(let i=0;i<messages.length;i++){
    //     console.log("Username-----", this.user1)
    //   if( this.user1==messages[i].username)
    //   {
    //   this.messages = messages[i].msg;
    // console.log("hello",messages)
    // }}
      
      
    // });      
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
