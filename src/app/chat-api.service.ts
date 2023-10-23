import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, Subject, retry } from 'rxjs';
import { Socket } from 'ngx-socket-io';

export interface Comment{
  comment_body:string,
  comment_place:string,
  comment_place_id:string,
  commenter:string,
  comment_title:string,
  rating:number
}

export interface RetrievedComment{
  comment_body:string,
  comment_place:string,
  comment_place_id:string,
  commenter:string,
  comment_title:string,
  rating:number
}

export interface Review{
  comments:RetrievedComment[],
  rating:number
}

export interface Chats{
  user_id:string,
  user_name:string,
  user_profile_image:string,
  user_type:string,
  messages:any[]
}

export interface Chat{
  sent_to:string,
  sent_from:string,
  status:string,
  send_date_and_time:string,
  message:string
}

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  constructor(private http:HttpClient,private socket:Socket) { }

  rateandcomment(comment:Comment):Observable<Comment> {
    let commentsetdata = new FormData()
    commentsetdata.append("comment_body",comment.comment_body)
    commentsetdata.append("comment_place",comment.comment_place)
    commentsetdata.append("comment_place_id",comment.comment_place_id)
    commentsetdata.append("commenter",comment.commenter)
    commentsetdata.append("comment_title",comment.comment_title)
    commentsetdata.append("rating",comment.rating.toString())
    return this.http.post<Comment>("http://localhost/markt_php/comment_set.php",commentsetdata)
    .pipe(
      retry(2)
    )
  }

  getcommentsandrating(commentplaceid: string,comment_place: string):Observable<Review>{
    return this.http.get<Review>(`http://localhost/markt_php/comments_get.php?
          comment_place_id=${commentplaceid}&comment_place=${comment_place}`)
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

  messagesobservable = this.socket.fromEvent<any>("message")
  newreadmessagesobservable = this.socket.fromEvent<any>("read")

  connectws(user_id:string){
    this.socket.connect()
    this.socket.emit("join-chat",JSON.stringify({rid:user_id}))
  }

  sendmessage(message:Chat){
    this.socket.emit("message",message)
  }

  closeconnection(){
    this.socket.emit("disconnect")
    this.socket.disconnect()
  }

  setmessageread(messages:any[],recipent:string){
    this.socket.emit("read",{recipent:recipent,messages:messages})
  }

  settyping(recipent:string){
    this.socket.emit("typing",JSON.stringify({recipent:recipent}))
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
