import { Component,DoCheck, OnInit } from '@angular/core';
import { UserstateService } from './userstate.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserstateService]
})
export class AppComponent implements DoCheck,OnInit{
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
  }

  presentlocation = ""

  ngDoCheck(): void {
    
  }

  antisidebars = ["/new","/userauth","/passwordretrieval"]
  antitopbars = ["/new","/userauth","/account","/passwordretrieval"]
  antichats = ["/new","/userauth","/account","/passwordretrieval"]


}
