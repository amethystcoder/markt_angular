import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../product-api.service';
import { ProductQuery } from "../products.model";
import { UserstateService } from '../userstate.service';
import { Chats } from '../chat.model';

@Component({
  selector: 'app-buyer-query',
  templateUrl: './buyer-query.component.html',
  styleUrls: ['./buyer-query.component.css']
})
export class BuyerQueryComponent implements OnInit{

  constructor(private productapi:ProductApiService,private userstate:UserstateService){}

  ngOnInit(): void {
    //use store
   /*  this.userstate.user_id_sub.subscribe((userid)=>{
      this.userid = userid
      this.productapi.getsellerqueries(this.userid).subscribe((queries)=>{
        this.queries = queries
      })
    }) */
  }

  userid = ""
  queries:ProductQuery[] = [] 

  settimesince(query:ProductQuery){
    let timesinceinseconds = (Date.now() / 1000) - query.stale_time
    let timesinceinminutes = timesinceinseconds/60
    let timesinceinhours = timesinceinminutes/60
    let timesinceindays = timesinceinhours/24
    if(timesinceindays > 30){
      return query.date_created
    }
    if(timesinceindays < 1){
      if (timesinceinhours < 1) {
        if (timesinceinminutes < 1) {
          return Math.round(timesinceinseconds) == 1 ? Math.round(timesinceinseconds).toString() + " second ago":Math.round(timesinceinseconds).toString() + " seconds ago"
        }
        else{
          return Math.round(timesinceinminutes) == 1 ? Math.round(timesinceinminutes).toString() + " minute ago":Math.round(timesinceinminutes).toString() + " minutes ago"
        }
      }
      else{
        return Math.round(timesinceinhours) == 1 ? Math.round(timesinceinhours).toString() + " hour ago":Math.round(timesinceinhours).toString() + " hours ago"
      }
    }
    else{
      return Math.round(timesinceindays) == 1? Math.round(timesinceindays).toString() + " day ago":Math.round(timesinceindays).toString() + " days ago"
    }
  }

  opennewchat(query:ProductQuery){
    let newchat:Chats = {
      messages:[],
      user_id:query.buyer_id,
      user_name:query.buyer_name,
      user_profile_image:"",
      user_type:"buyer",
    }
    //use store
    //this.userstate.newchatuser.next(newchat)
  } 

}
