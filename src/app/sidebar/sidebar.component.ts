import { Component,Output, OnInit, EventEmitter, inject } from '@angular/core';
import { UserstateService, signalstore } from '../userstate.service';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  ngOnInit(): void {
    switch (this.user) {
      case "buyer":
        this.userdata.get_buyer_unchecked_items(this.userid).subscribe((unchecked_items)=>{
          if (unchecked_items) {
            this.buyercartitemnum = unchecked_items.cart_item_number
            this.buyerordernum = unchecked_items.order_item_number
          }
        })
        break;
      case "seller":
        this.userdata.get_seller_unchecked_items(this.userid).subscribe((unchecked_items)=>{
          if (unchecked_items) {
            this.sellerunattendedordernum = unchecked_items.unattended_order_item_number
          }
        })
      break;
    }
  }

  constructor(private userstate:UserstateService,private userdata:UserdataService){ }

  @Output() showstateemitter = new EventEmitter<boolean>();

  store = inject(signalstore)

  user = this.store.user_type()
  userid = this.store.user_id()
  username = this.store.name()
  profile_image = this.store.user_profile_image()

  buyercartitemnum = 0
  buyerordernum = 0

  sellerunattendedordernum = 0

  sendtosmscreenclosestate(){
    this.showstateemitter.emit(false)
  }

}
