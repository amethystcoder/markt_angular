import { Component, OnInit } from '@angular/core';
import { UserstateService } from './userstate.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Chats } from './chat-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserstateService]
})
export class AppComponent implements OnInit{
  title = 'markt';
  user_type = ''
  username = ''
  userid = ''

  constructor(private userstate:UserstateService,private route:Router){ }

  ngOnInit(): void {
    this.userstate.user_id_sub.subscribe((data)=>{
      this.userid = data
    })
    this.userstate.user_name_sub.subscribe((data)=>{
      this.username = data
    })
    this.userstate.user_type_sub.subscribe((data)=>{
      this.user_type = data
    })
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((ev:any) =>{
      this.presentlocation = ev.url
    })
    this.userstate.newchatuser_sub.subscribe((newchat)=>{
      this.newbasechat = newchat
    })
    /* navigator.geolocation.getCurrentPosition((position)=>{
      console.log("long")
      console.log(position.coords.longitude.toString());
      console.log("lat")
      console.log(position.coords.latitude.toString());
      this.userstate.longtitude.next(position.coords.longitude)
      this.userstate.latitude.next(position.coords.latitude)
    }) */
  }

  newbasechat!: Chats;
  presentlocation = ""

  antisidebars = ["/new","/userauth","/passwordretrieval"]
  antitopbars = ["/new","/userauth","/account","/passwordretrieval"]
  antichats = ["/new","/userauth","/account","/passwordretrieval"]

}