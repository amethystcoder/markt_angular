import { Component, OnInit, inject } from '@angular/core';
import { UserstateService, signalstore } from '../userstate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit{

  constructor(private userstate:UserstateService,private router:Router) { }

  ngOnInit(): void {
    //use store
    /* this.userstate.user_name_sub.subscribe((username)=>{
      this.username = username
    }) */
  }

  store = inject(signalstore)

  username:string = this.store.name()
  sidebaropen = false

  togglesidebar(){
    this.sidebaropen = !this.sidebaropen
  } 

  logoutuser(){
    //TODO here we need to send a request to the server to stop the session
    //use store
    /* this.userstate.user_id.next("")
    this.userstate.user_name.next("") */
    this.router.navigate(["userauth"])
  }

  setclosestate(state:boolean){
    this.sidebaropen = state
  }

}