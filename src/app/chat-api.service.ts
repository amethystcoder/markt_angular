import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, Subject, catchError, delayWhen, retry, retryWhen, switchAll, tap, timer } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

export interface Comment{
  comment_body:string,
  comment_place:string,
  comment_place_id:string,
  commenter:string,
  comment_title:string,
  rating:number
}

export interface Review{
  comments:Comment[],
  rating:number
}

export interface Chats{
  user_id:string,
  user_name:string,
  user_profile_image:string,
  user_type:string,
  messages:Chat[]
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

  constructor(private http:HttpClient) { }

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

  private subject!:WebSocketSubject<any>
  private messagesubject = new Subject<any>()
  messages = this.messagesubject.pipe(switchAll(),catchError(e => {throw e}))

  connect(conntype : {reconnect:boolean} = {reconnect:false}){
    console.log("connecting")
    if(!this.subject || this.subject.closed){
      this.subject = this.newsocketconnection()
      const messages = this.subject.pipe(
        conntype.reconnect? this.reconnect : o => o,
        tap({
          error: err => console.log(err),
          next: next => console.log(next)
        }),
        catchError(err => EMPTY)
      )
      this.messagesubject.next(messages)
      console.log("connected")
    }
  }

  initializewsuser(user_id:string){
    this.subject.next(JSON.stringify({register_id:user_id}))
  }

  newsocketconnection(){
    return webSocket({
      url:"ws://localhost:8080",
      closeObserver: {
        next: () => {
          this.connect({reconnect:true})
        }
      }
    })
  }

  reconnect(observable : Observable<any>):Observable<any>{
    return observable.pipe(
      retry(2),
      delayWhen(_ => timer(4000))
    )
  }

  message(message:Chat){
    this.subject.next(JSON.stringify(message))
    console.log("sent")
  }

  closeconn(){
    this.subject.complete()
  }

}
