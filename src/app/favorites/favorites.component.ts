import { Component, OnInit, inject } from '@angular/core';
import { UserstateService, signalstore } from '../userstate.service';
import { UserdataService } from '../userdata.service';
import { Favorite } from "../userdata.model";
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
    this.userdata.getbuyerfavorites(this.userid,this.usertype)
    .subscribe((favorites)=>{
      this.allfavorites = favorites
    })
  }

  store = inject(signalstore)

  usertype = this.store.user_type()
  userid = this.store.user_id()

  allfavorites:Favorite[] = []

  previous(){
    this.userstate.previouspage()
   }

}
