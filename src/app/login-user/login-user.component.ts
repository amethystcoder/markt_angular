import { Component, OnInit, inject } from '@angular/core';
import { SignupandloginService } from '../signupandlogin.service';
import { LoginDetails } from "../signupandlogin.model";
import { Router } from '@angular/router';
import { signalstore } from "../userstate.service";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {

  store = inject(signalstore)

  constructor(private loginservice:SignupandloginService,private router:Router){}

  usertype = this.store.user_type()

  namestate = this.usertype == "buyer" ? "Username" : this.usertype == "seller" ? "Shopname" : this.usertype == "delivery" ? "Deliveryname" : ""

  warnerr:string|object = ""

  setuser(user:string){
    this.store.setusertype(user.toLowerCase())
    this.usertype = user.toLowerCase();
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
      console.log(data)
      if (data.status >= 400) {
        this.warnerr = data.error.message
        setTimeout(() => {
          this.warnerr = ""
        }, 3000)
      }
      if (data.code == 200) {
        //this.store.setuser(this.usertype,data.user,data.user_id,data.profile_image)
          this.router.navigate(["home"])
      }
    })
  }
}