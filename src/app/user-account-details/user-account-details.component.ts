import { Component, OnInit, inject } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { Buyer, Seller, Delivery } from "../userdata.model";
import { UserstateService, signalstore } from '../userstate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account-details',
  templateUrl: './user-account-details.component.html',
  styleUrls: ['./user-account-details.component.css']
})
export class UserAccountDetailsComponent implements OnInit{

  ngOnInit(): void {
    this.getdata()
  }

  constructor(private userdata:UserdataService,private userstate:UserstateService,private router:Router){ }

  previous(){
    this.userstate.previouspage()
   }

  upload_profile_image(event:any){
    this.userdata.updateuserprofileimage(this.usertype,this.userid,event.target?.files[0]).subscribe((data)=>{
      if(data){
        alert("profile image successfully changed")
      }
    })
  }

  logoutuser(){
    //TODO here we need to send a request to the server to stop the session
    this.store.setuser(this.usertype,"","","")
    this.router.navigate(["userauth"])
  }

  store = inject(signalstore)

  usertype = this.store.user_type()
  userid = this.store.user_id()

  buyer:Buyer|undefined
  buyerplac:Buyer|undefined

  seller:Seller|undefined
  sellerplac:Seller|undefined

  delivery:Delivery|undefined
  deliveryplac:Delivery|undefined

  onedit = false

  getdata(){
    switch(this.usertype){
      case "buyer":
        this.userdata.getbuyerdata(this.userid).subscribe((data)=>{
          this.buyer = data
          this.buyerplac = data
        })
        break
      case "seller":
        this.userdata.getsellerdata(this.userid).subscribe((data)=>{
          this.seller = data
          this.sellerplac = data
        })
        break
    }
  }

  switchmode(){
    this.onedit = !this.onedit
  }

  changebuyerdet(){
    this.userdata.updatebuyerdata(this.userid,this.buyerplac).subscribe((data)=>{
      this.switchmode()
    })
  }

  changesellerdet(){
    this.userdata.updatesellerdata(this.userid,this.sellerplac).subscribe((data)=>{
      this.switchmode()
    })
  }

}
