import { Component, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit{

  constructor(private userstate:UserstateService,private router:Router) { }

  ngOnInit(): void {
    this.userstate.user_name_sub.subscribe((username)=>{
      this.username = username
    })
  }

  username:string = ""

  logoutuser(){
    //TODO here we need to send a request to the server to stop the session
    this.userstate.user_id.next("")
    this.userstate.user_name.next("")
    this.router.navigate(["userauth"])
  }
}