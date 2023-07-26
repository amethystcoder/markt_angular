import { Component,Input, OnDestroy, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';
import { Chat, ChatApiService, Chats } from '../chat-api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy{

  constructor(private userstate:UserstateService,private chatservice:ChatApiService){}

  ngOnInit(): void {
    this.userstate.user_id_sub.subscribe((id)=>{
      this.user_id = id
    })
    /* this.userstate.chatstate_sub.subscribe((chatstate)=>{
      this.state = chatstate
    }) */
    this.chatservice.getchats(this.user_id).subscribe((data)=>{
      this.chats = data
    })
    this.chatservice.connect()
    this.chatservice.initializewsuser(this.user_id)
    this.chatservice.messages.subscribe((message)=>{
      this.chats.push(message)
    })
  }

  ngOnDestroy(): void {
    this.chatservice.closeconn()
  }

  newmessage = ""

  file!: File;

  user_id = "" 

  selectedchatdetails:Chats | undefined

  chats:any[] = []

  state = "closed"

  chatsall = false 

  openallchats(){
    this.state = "all"
    //this.userstate.chatstate.next("all")
  }
  
  closeallchats(){
    this.state = "closed"
    //this.userstate.chatstate.next("closed")
  }

  openchat(item:Chats){
    this.selectedchatdetails = item
    this.state = "selected"
    //this.userstate.chatstate.next("selected")
  }

  add_image(event:any){
    this.file = event.target.files[0]
  }

  send(){
    let message_to_send:Chat = {
      message:this.newmessage,
      sent_from:this.user_id,
      sent_to:this.selectedchatdetails!.user_id,
      status:"",
      send_date_and_time:Date.now().toString()
    }
    this.chatservice.message(message_to_send)
  }

  closechat(){}


}
