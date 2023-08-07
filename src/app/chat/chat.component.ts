import { Component,Input, OnDestroy, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';
import { Chat, ChatApiService, Chats } from '../chat-api.service';
import { Observable,Subject } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit/* ,OnDestroy */{

  constructor(private userstate:UserstateService,private chatservice:ChatApiService){
    
  }

  ngOnInit(): void {
    this.userstate.user_id_sub.subscribe((id)=>{
      this.user_id = id
    })
    this.chatservice.getchats(this.user_id).subscribe((data)=>{
      this.chats = data
    })
    this.chatservice.messagesobservable.subscribe((message)=>{
      //Here we need to get the user that sent the message if the message is not from the logged in user
      //and add the messages to the message of that user
      this.chats.forEach((chat)=>{
        if(chat.user_id == message.sent_to || chat.user_id == message.sent_from){
          chat.messages.push(message)
        }
      })
    })
  }

  /* ngOnDestroy(): void {
    this.chatservice.closeconnection()
  } */

  newmessage = ""

  file!: File;

  user_id = "" 

  selectedchatdetails:Chats | undefined

  chats:any[] = []

  state = "closed"

  chatsall = false 

  openallchats(){
    this.state = "all"
    this.chatservice.connectws()
    this.chatservice.initializenewuser(this.user_id)
    //this.userstate.chatstate.next("all")
  }

  cancelchats(){
    this.state = "closed"
  }

  baktoallchats(){
    this.state = "all"
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
    this.chatservice.sendmessage(message_to_send)
    this.newmessage = ""
  }

  clip(message:string,name=false){
    if(!name)
      return message.slice(0,15)+"..."
    return message.split(" ")[0].slice(0,10)
  }

  closechat(){}


}
