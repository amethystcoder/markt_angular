import { Component, inject} from '@angular/core';
import { signalstore } from '../userstate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  store = inject(signalstore)
  usertype = this.store.user_type()
}
