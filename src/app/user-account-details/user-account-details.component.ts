import { Component, OnInit } from '@angular/core';
import { Buyer, Delivery, Seller, UserdataService } from '../userdata.service';
import { UserstateService } from '../userstate.service';

@Component({
  selector: 'app-user-account-details',
  templateUrl: './user-account-details.component.html',
  styleUrls: ['./user-account-details.component.css']
})
export class UserAccountDetailsComponent implements OnInit{

  ngOnInit(): void {
    this.userstate.user_type_sub.subscribe((usertype)=>{
      this.usertype = usertype
    })
    this.userstate.user_id_sub.subscribe((userid)=>{
      this.userid = userid
      this.getdata()
    })
  }

  constructor(private userdata:UserdataService,private userstate:UserstateService){ }

  upload_profile_image(event:any){
    this.userdata.updateuserprofileimage(this.usertype,this.userid,event.target?.files[0]).subscribe((data)=>{
      if(data){
        alert("profile image successfully changed")
      }
    })
  }

  usertype = ""
  userid = ""

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
      case "delivery":
        this.userdata.getdeliverydata(this.userid).subscribe((data)=>{
          this.delivery = data
          this.deliveryplac = data
        })
        break
    }
  }

  switchmode(){
    this.onedit = !this.onedit
  }

  changebuyerdet(){
    this.userdata.updatebuyerdata(this.userid,this.buyerplac).subscribe((data)=>{
      console.log(data)
      this.switchmode()
    })
  }

  changesellerdet(){
    this.userdata.updatesellerdata(this.userid,this.sellerplac).subscribe((data)=>{
      console.log(data)
      this.switchmode()
    })
  }

  changedeliverydet(){
    this.userdata.updatedeliverydata(this.userid,this.deliveryplac).subscribe((data)=>{ 
      console.log(data)
      this.switchmode()
    })
  }

}
