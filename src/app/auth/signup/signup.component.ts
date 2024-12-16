import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../../services/services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  registrationService = inject(RegistrationService)

  userType = "buyer" //This should be determined by the state

  onCreateAccount(formdata: NgForm): void {
    //clean and submit data
    let data = null
    if (this.userType == "seller") data = this.registrationService.registerSeller(formdata.value)
    if (this.userType == "buyer") data = this.registrationService.registerBuyer(formdata.value)
    
    if (data) data.subscribe(result=>{
      console.log(result.status)
    })
  }
}
