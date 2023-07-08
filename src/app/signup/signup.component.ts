import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { SignupandloginService } from '../signupandlogin.service';
import { ProductApiService } from '../product-api.service';
import { UserstateService } from '../userstate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public constructor(private signupservice:SignupandloginService,private productservice:ProductApiService
    ,private userstate:UserstateService,private router:Router){
      userstate.user_type.next("seller")
      userstate.user_type_sub.subscribe((user_type)=>{
        this.usertype = user_type
      })
  }

  usertype = ""

  signuplevel = 0;

  states = {
    user:"Seller",
    userplaceholder:"Shopname",
    category_add_cont:true,
    working_for_org_and_vehicle_type_add:false,
    shop_desc_and_dir:true,
    catgshow:false
  }

  file!: File | Blob;

  category_list:Array<string> = []

  temp_cat_list:Array<string> = []

  users = { buyer:false,seller:true,delivery:false}

  profile_img_file = ""

  allcategories:Array<string> = []

  signupform = new FormGroup({
    username : new FormControl(''),
    password : new FormControl(''),
    re_entered_password : new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    directions: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    country: new FormControl(''),
    house_number: new FormControl(''),
    vehicle_type: new FormControl(''),
    working_for_org: new FormControl(''),
    org_name: new FormControl(''),
    latitude: new FormControl(''),
    longtitude: new FormControl(''),
    postal_code: new FormControl(''),
		state: new FormControl(''),
    profile_image: new FormControl(''),
    payment_details:new FormGroup({
      payment_account_first_name: new FormControl(''),
      payment_account_last_name: new FormControl(''), 
      payment_account_number: new FormControl(''), 
      card_number: new FormControl(''), 
      card_expiry_date: new FormControl(''),
      cvc: new FormControl('')
    })
  })

  addcat(category:string){
    this.temp_cat_list.push(category)
  }

  public setuser(user:string){
    switch(user){
      case "Buyer":
        this.states.category_add_cont = false
        this.states.shop_desc_and_dir = false
        this.states.user = "Buyer"
        this.states.userplaceholder = "Username"
        this.states.working_for_org_and_vehicle_type_add = false
        this.userstate.user_type.next("buyer")
        break
      case "Seller":
        this.states.category_add_cont = true
        this.states.shop_desc_and_dir = true
        this.states.user = "Seller"
        this.states.userplaceholder = "Shopname"
        this.states.working_for_org_and_vehicle_type_add = false 
        this.userstate.user_type.next("seller")
        break
      case "Delivery":
        this.states.category_add_cont = false
        this.states.shop_desc_and_dir = false
        this.states.user = "Delivery"
        this.states.userplaceholder = "Deliveryname"
        this.states.working_for_org_and_vehicle_type_add = true
        this.userstate.user_type.next("delivery")
        break
      default:
        break
    }
  }

  upload_profile_image(event:any){
    this.file = event.target?.files[0]
    this.profile_img_file = URL.createObjectURL(this.file)
  }

  workingfororgdelivery = ""

  setorg(val:string){
    this.workingfororgdelivery = val
  }

  get buttonstate(){
    return "button-active"
  }

  public incsignuplevel(){
    this.signuplevel++
  }

  public redsignuplevel(){
    this.signuplevel--
  }

  isslidablelarge(num:number){
    return num === this.signuplevel
  }

  passwordsame(){
    let usernameset = this.signupform.controls.username.value != ""
    let eqpasswords = this.signupform.controls.password.value == this.signupform.controls.re_entered_password.value
    let nonepmtypasswords = this.signupform.controls.password.value != "" && this.signupform.controls.re_entered_password.value != ""
    return eqpasswords && nonepmtypasswords && usernameset
  }

  basicinfofilled(){
    let iscorrectemail = this.signupform.controls.email.value?.includes("@") &&  this.signupform.controls.email.value?.includes(".")
    return (this.signupform.controls.email.value != "" && iscorrectemail) || this.signupform.controls.phone_number.value != ""
  }

  adddatestroke(){
    let paymentdetails = this.signupform.controls.payment_details.controls
    if(paymentdetails.card_expiry_date.value?.length == 2){
      paymentdetails.card_expiry_date.setValue(paymentdetails.card_expiry_date.value+"/")
    }
  }

  mergecatgs(){
    this.temp_cat_list.forEach((cat)=>{
      this.category_list.push(cat)
    })
    this.temp_cat_list = []
    this.states.catgshow = false
  }

  removecatgadd(){
    this.states.catgshow = false
    this.temp_cat_list = []
  } 

  setcatgadd(){
    if(this.allcategories.length == 0){
      this.productservice.getcategorynames().subscribe((data)=>{
        this.allcategories = data
      })
    }
    this.states.catgshow = true
  }

  uselocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      this.signupform.controls.longtitude.setValue(position.coords.longitude.toString())
      this.signupform.controls.latitude.setValue(position.coords.latitude.toString())
    })
  }

  removefromcategories(items:string){
    this.category_list.splice(this.category_list.indexOf(items),1)
  }

  displayvalues(){
    this.signupform.controls.category.setValue(this.category_list.toString())
    this.signupform.controls.working_for_org.setValue(this.workingfororgdelivery)
    this.signupservice.createnewuser(this.signupform.value,this.file,this.usertype)
    .subscribe((data)=>{
      console.log(data)
      if(data.saved){
        this.userstate.setuser(data.user_type,data.username,data.user_id,data.profile_image)
        if(data.user_type == "seller" || data.user_type == "buyer"){
          this.router.navigate(["home"])
        }
        else{
          if(data.user_type == "delivery"){
            this.router.navigate(["orders/delivery"])
          }
        }
      }
    })
  }

}
