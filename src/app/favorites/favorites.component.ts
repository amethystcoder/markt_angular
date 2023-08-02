import { Component, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';
import { Favorite, UserdataService } from '../userdata.service';
import { ProductApiService } from '../product-api.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{

  constructor(private userstate:UserstateService,private userdata:UserdataService,
    private productapi:ProductApiService){ }

  ngOnInit(): void {
    this.userstate.user_type_sub.subscribe((usertype)=>{
      this.usertype = usertype
    })
    this.userstate.user_id_sub.subscribe((userid)=>{
      this.userid = userid
    })
    this.userdata.getbuyerfavorites(this.userid,this.usertype)
    .subscribe((favorites)=>{
      this.allfavorites = favorites
    })
  }

  userid = ""
  usertype = ""

  allfavorites:Favorite[] = []

  previous(){
    this.userstate.previouspage()
   }

}
