import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, Subject, retry } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Chat, Chats, Comment, RetrievedComment, Review } from './chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  url = "http://localhost:5000"

  constructor(private http:HttpClient,private socket:Socket) { 
    this.messagesobservable = this.socket.fromEvent<any>("message")
    this.newreadmessagesobservable = this.socket.fromEvent<any>("read")
  }

  rateandcomment(comment:Comment):Observable<Comment> {
    let commentsetdata = new FormData()
    commentsetdata.append("comment_body",comment.comment_body)
    commentsetdata.append("comment_place",comment.comment_place)
    commentsetdata.append("comment_place_id",comment.comment_place_id)
    commentsetdata.append("commenter",comment.commenter)
    commentsetdata.append("comment_title",comment.comment_title)
    commentsetdata.append("rating",comment.rating.toString())
    return this.http.post<Comment>(`${this.url}/comments/rate_and_comment`,commentsetdata)
    .pipe(
      retry(2)
    )
  }

  getcommentsandrating(commentplaceid: string,comment_place: string):Observable<Review>{
    return this.http.get<Review>(`${this.url}/comments/${commentplaceid}`)
          .pipe(
            retry(2)
          )
  }

  getchats(userid:string){
    return this.http.get<Chats[]>(`http://localhost/markt_php/get_user_chats_summ.php?user_id=${userid}`)
    .pipe(
      retry(2)
    )
  }

  messagesobservable;
  newreadmessagesobservable;

  connectws(user_id:string){
    //this.socket.connect()
    //this.socket.emit("join-chat",JSON.stringify({rid:user_id}))
  }

  sendmessage(message:Chat){
    //this.socket.emit("message",message)
  }

  closeconnection(){
    //this.socket.emit("disconnect")
    //this.socket.disconnect()
  }

  setmessageread(messages:any[],recipent:string){
    //this.socket.emit("read",{recipent:recipent,messages:messages})
  }

  settyping(recipent:string){
    //this.socket.emit("typing",JSON.stringify({recipent:recipent}))
  }

  register(){}


  //chats = this.socket.fromEvent<Chats[]>("")

  /* subject!: WebSocket;
  messagesobservable:Subject<any> = new Subject<any>()

  connectws(){
    if (!this.subject) {
      this.subject = new WebSocket("ws://localhost:8080")
      this.subject.onmessage = (message)=>{
        this.messagesobservable.next(JSON.parse(message.data))
      }
      this.subject.onerror = (err)=>{
        console.error(err);
      }
    }
  }
  
  initializenewuser(user_id:string){
    if (this.subject.readyState == this.subject.CLOSED || this.subject.readyState == this.subject.CLOSING) {
      this.connectws()
    }
    let registr = {
      register_id:user_id
    }
    this.subject.send(JSON.stringify(registr))
  }

  sendmessage(message:any){
    if (this.subject.readyState == this.subject.CLOSED || this.subject.readyState == this.subject.CLOSING) {
      this.connectws()
    }
    this.subject.send(JSON.stringify(message))
  }

  closeconnection(){
    this.subject.close()
  } */


}
