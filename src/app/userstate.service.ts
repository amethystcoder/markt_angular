import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstateService {

  constructor() { }

  user_type = new BehaviorSubject<string>("buyer")
  user_name = new BehaviorSubject<string>("")
  user_id = new BehaviorSubject<string>("")
  user_profile_image = new BehaviorSubject<string>("")

  user_type_sub = this.user_type.asObservable()
  user_name_sub = this.user_name.asObservable()
  user_id_sub = this.user_id.asObservable()
  user_profile_image_sub = this.user_profile_image.asObservable()

  setuser(user_type:string,user_name:string,user_id:string,user_profile_image:string){
    this.user_id.next(user_id)
    this.user_name.next(user_name)
    this.user_type.next(user_type)
    this.user_profile_image.next(user_profile_image)
  }

}