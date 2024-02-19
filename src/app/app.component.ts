import { Component, OnInit, inject } from '@angular/core';
import { UserstateService, signalstore } from './userstate.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Chats } from './chat.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserstateService]
})
export class AppComponent implements OnInit{
  store = inject(signalstore)
  title = 'markt';
  user_type = this.store.user_type()
  username = this.store.name()
  userid = this.store.user_id()

  constructor(private route:Router){ }

  ngOnInit(): void {
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((ev:any) =>{
      this.presentlocation = ev.url
    })
    //use store
    /* this.userstate.newchatuser_sub.subscribe((newchat)=>{
      this.newbasechat = newchat
    }) */
    /* navigator.geolocation.getCurrentPosition((position)=>{
      console.log("long")
      console.log(position.coords.longitude.toString());
      console.log("lat")
      console.log(position.coords.latitude.toString());
      this.userstate.longtitude.next(position.coords.longitude)
      this.userstate.latitude.next(position.coords.latitude)
    }) */
  }

  private userstate = inject(UserstateService) 

  newbasechat!: Chats;
  presentlocation = ""

  antisidebars = ["/new","/userauth","/passwordretrieval"]
  antitopbars = ["/new","/userauth","/account","/passwordretrieval"]
  antichats = ["/new","/userauth","/account","/passwordretrieval"]

}