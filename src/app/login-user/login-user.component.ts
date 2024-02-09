import { Component, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';
import { SignupandloginService } from '../signupandlogin.service';
import { LoginDetails } from "../signupandlogin.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit{

  ngOnInit(): void {
    //use store
    /* this.userstate.user_type_sub.subscribe((usertype)=>{
      this.usertype = usertype
      this.namestate = usertype == "buyer" ? "Username" : usertype == "seller" ? "Shopname" : usertype == "delivery" ? "Deliveryname" : ""
    }) */
  }

  constructor(private loginservice:SignupandloginService,private userstate:UserstateService
    ,private router:Router){}

  usertype = ""

  namestate = ""

  warnerr:string|object = ""

  setuser(user:string){
    //use store
    /* switch(user){
      case "Buyer":
        this.userstate.user_type.next("buyer")
        break
      case "Seller":
        this.userstate.user_type.next("seller")
        break
      case "Delivery":
        this.userstate.user_type.next("delivery")
        break
      default:
        break
    } */
  }

  userlogindata:LoginDetails = {
    usertype:"",
    username:"",
    password:""
  }

  emptyfields(){
    return this.userlogindata.username == "" || this.userlogindata.password == ""
  }

  loginuser(){
    this.userlogindata.usertype = this.usertype
    this.loginservice.loginexistinguser(this.userlogindata)
    .subscribe((data)=>{
      this.warnerr = data.message
      setTimeout(() => {
        this.warnerr = ""
      }, 3000)
      //use store
      /* this.userstate.user_id.next(data.user_id)
      this.userstate.user_name.next(data.user)
      this.userstate.user_profile_image.next(data.profile_image) */
      if (data.message == "ok") {
        if(this.usertype == "seller" || this.usertype == "buyer"){
          this.router.navigate(["home"])
        }
        else{
          if(this.usertype == "delivery"){
            this.router.navigate(["orders/delivery"])
          }
        }
      }
    })
  }
}