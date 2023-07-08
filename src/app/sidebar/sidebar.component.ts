import { Component,Input, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  ngOnInit(): void {
    this.userstate.user_type_sub.subscribe((usertype)=>{
      this.user = usertype
    })
    this.userstate.user_profile_image_sub.subscribe((userprofileimage)=>{
      this.profile_image = userprofileimage
    })
  }

  constructor(private userstate:UserstateService){ }

  user = ""
  profile_image = ""

}
