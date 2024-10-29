import { Component, inject } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { SignupandloginService } from '../signupandlogin.service';
import { ProductApiService } from '../product-api.service';
import { Router } from '@angular/router';
import { signalstore } from '../userstate.service'
import { CanComponentDeactivate } from '../route-guards';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements CanComponentDeactivate{
  
  canDeactivate!: () => boolean | Promise<boolean> | Observable<boolean>;

  private signupservice = inject(SignupandloginService)
  private router = inject(Router)
  private store = inject(signalstore)

  usertype = this.store.user_type()

  signuplevel = 0;

  existingusername: any

  username = "@"

  userplaceholder = this.usertype == 'buyer' ? "Username" : this.usertype == 'seller' ? "Shopname" : this.usertype == 'delivery' ? "Deliveryname" : ""

  catgshow = false

  file!: File | Blob;

  category_list:Array<string> = []

  profile_img_file = ""

  signupform = new FormGroup({
    buyerOrShopName: new FormControl(''),
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
    house_number: new FormControl(0),
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

  public setuser(user:string){
    this.store.setusertype(user.toLowerCase())
    this.usertype = user.toLowerCase()
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

  checkExistingUsername(event:any){
    if(this.username == "" || this.username.startsWith("@")) this.username = `@${this.username}`
    this.signupservice.checkForExistingUsername(event.target.value).subscribe((data)=>{
      if (data == 0) {
        this.existingusername = data
        console.log("correct")
      }
    })
  }

  passwordsame(){
    let usernameset = this.signupform.controls.buyerOrShopName.value != ""
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

  mergecatgs(catgs:string[]){
    catgs.forEach((cat)=>{
      this.category_list.push(cat)
    })
    this.catgshow = false
  }

  setcatgadd(){
    this.catgshow = true
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
    console.log(this.signupform.value)
    this.signupservice.createnewuser(this.signupform.value,this.file,this.usertype)
    .subscribe((data)=>{
      if(data.status < 300){
        this.router.navigate(["home"])
        console.log(data.body)
        /* this.store.setuser(data.user_type,data.username,data.user_id,data.profile_image)
        if(data.user_type == "seller" || data.user_type == "buyer"){
          this.router.navigate(["home"])
        } */
       /*  else{
          if(data.user_type == "delivery"){
            this.router.navigate(["orders/delivery"])
          }
        } */
      }
    })
  }

}