import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { UserstateService } from '../userstate.service';

@Component({
  selector: 'app-retrieve-password',
  templateUrl: './retrieve-password.component.html',
  styleUrls: ['./retrieve-password.component.css']
})
export class RetrievePasswordComponent implements OnInit{

  ngOnInit(): void {
    //use store
    /* this.userstate.user_type_sub.subscribe((user_type)=>{
      this.usertype = user_type
    }) */
  }

  constructor(private userdata:UserdataService,private userstate:UserstateService){}

  useremail = ""
  userphonenumber = ""

  level = "getdetails"
  recoverytype = "email"

  usertype = ""

  retrievalcode:string = ""
  newpassword = ""

  recoverytypeset(type:string){
    this.recoverytype = type
  }

  passwordchanged = false

  checkvalidemail(){
    return this.useremail.includes("@") && this.useremail.includes(".") && this.useremail.length > 6
  }

  checkvalidphone(){
    return this.userphonenumber.includes("+") && this.userphonenumber.length > 9
  }

  tocoderecsegment(){
    if(this.recoverytype == "email"){
      this.userdata.setuserretrievalmail(this.usertype,this.useremail).subscribe((result)=>{
        console.log(result)
        if(result && result!=`user not in our ${this.usertype} database`){
          this.level = "entercode"
        }
        else{
          this.level = "not found"
        }
      })
    }
    else{
      if(this.recoverytype == "phone"){
        this.userdata.setuserretrievalphone(this.usertype,this.userphonenumber).subscribe((result)=>{
          console.log(result)
          if(result && result!=`user not in our ${this.usertype} database`){
            this.level = "entercode"
          }
          else{
            this.level = "not found"
          }
        })
      }
    }
  }

  retcodeandpasswordcorrect(){
    return this.retrievalcode.length == 6 && parseInt(this.retrievalcode) && this.newpassword.length > 5
  }

  submitcodeandpassword(){
    if(this.recoverytype == "email"){
      this.userdata.resetuserpasswordmail(this.useremail,this.newpassword,this.retrievalcode,this.usertype)
      .subscribe((result)=>{
        this.passwordchanged = result
        this.level = "retrievalresult"
      })
    }
    else{
      if(this.recoverytype == "phone"){
        this.userdata.resetuserpasswordphone(this.userphonenumber,this.newpassword,this.retrievalcode,this.usertype)
      .subscribe((result)=>{
        this.passwordchanged = result
        this.level = "retrievalresult"
      })
      }
    }
  }
}
