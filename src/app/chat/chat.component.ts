import { Component,Input, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';
import { ChatApiService, Chats } from '../chat-api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  constructor(private userstate:UserstateService,private chatservice:ChatApiService){}

  ngOnInit(): void {
    this.userstate.user_id_sub.subscribe((id)=>{
      this.user_id = id
    })
    this.chatservice.getchats(this.user_id).subscribe((data)=>{
      this.chats = data
    })
  }

  user_id = "" 

  selectedchatdetails:Chats | undefined

  chats:Chats[] = []

  @Input()
  state = "closed"

  @Input()
  chatsall = false 

  openallchats(){
    this.state = "all"
  }
  
  closeallchats(){
    this.state = "closed"
  }

  openchat(item:Chats){
    this.selectedchatdetails = item
    this.state = "selected"
  }

  closechat(){}

}
