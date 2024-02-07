export interface User{
    user_type: string,
      username : string,
      password : string,
      re_entered_password : string,
      email: string,
      phone_number: string,
      category: string,
      description: string,
      directions: string,
      city: string,
      street: string,
      country: string,
      house_number: string,
      vehicle_type: string,
      working_for_org: string,
      org_name: string,
      latitude: string,
      longtitude: string,
      postal_code: string,
          state: string,
      profile_image: File,
      payment_details:{
        payment_account_first_name: string,
        payment_account_last_name: string, 
        payment_account_number: string, 
        card_number: string, 
        card_expiry_date: string,
        cvc: string
      }
  }
  
  export interface LoginDetails{
    usertype:string,
    username:string,
    password:string
  }
  
  export interface LoginResult{
    user:string,
    user_id:string,
    message:string,
    profile_image:string
  }
  
  export interface SignupResult{
    saved:boolean,
    user_id:string,
    username:string,
    user_type:string,
    profile_image:string
  }