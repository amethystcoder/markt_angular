import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { UnacceptedOrders, Orders, BuyerOrders, DeliveryOrders, SuccessfulOrder } from './orders.model'

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:5000"

  getpendingorders(sellerid:string){
    return this.http.get<Array<UnacceptedOrders>>(
      `${this.url}/orders/sellers/pending/${sellerid}`
      )
    .pipe(
      retry(2)
    )
  }

  getacceptedorders(sellerid:string){
    return this.http.get<Array<Orders>>(
      `${this.url}/orders/sellers/accepted/${sellerid}`
      )
    .pipe(
      retry(2)
    )
  }

  acceptorder(orderid:string,user_id:string,user_type:string){
    let formdata = new FormData()
    formdata.append('order_id',orderid)
    formdata.append('user_id',user_id)
    formdata.append('user_type',user_type)
    return this.http.put(
      `${this.url}/orders/sellers/update/accept/${orderid}`,
      formdata
    ).pipe(
      retry(2)
    )
  }

  declineorder(orderid:string,user_id:string,user_type:string){
    let formdata = new FormData()
    formdata.append('order_id',orderid)
    formdata.append('user_id',user_id)
    formdata.append('user_type',user_type)
    return this.http.put<boolean>(
      `${this.url}/orders/sellers/update/decline`,
      formdata
    ).pipe(
      retry(2)
    )
  }

  getbuyerorders(buyer_id:string){
    return this.http.get<BuyerOrders[]>(
      `${this.url}/orders/buyers/${buyer_id}`
      )
    .pipe(
      retry(2)
    )
  }

  /* getclosedeliveryorders(deliveryid:string,longtitude:number|undefined = undefined,latitude:number|undefined = undefined){
    if(longtitude && latitude)
    return this.http.get<DeliveryOrders[]>(
      `http://localhost/markt_php/get_delivery_orders.php?
        user_type=delivery&user_id=${deliveryid}
        &longtitude=${longtitude}&latitude=${latitude}`
      )
    .pipe(
      retry(2)
    )

    return this.http.get<DeliveryOrders[]>(
      `http://localhost/markt_php/get_delivery_orders.php?user_type=delivery&user_id=${deliveryid}`
      )
    .pipe(
      retry(2)
    )
  } */

  /* handleorder(deliveryid:string,orderid:string){
    let handlerdata = new FormData()
    handlerdata.append("user_id",deliveryid)
    handlerdata.append("user_type","delivery")
    handlerdata.append("order_id",orderid)
    return this.http.post<boolean>(
      "http://localhost/markt_php/handle_order.php",
      handlerdata
    ).pipe(
      retry(2)
    )
  }

  getdeliverypendingdeliveries(deliveryid:string){
    return this.http.get<DeliveryOrders[]>(
      `http://localhost/markt_php/get_pending_deliveries.php?user_type=delivery&user_id=${deliveryid}`
      )
    .pipe(
      retry(2),
      catchError(this.handleerror)
    )
  } */

  private handleerror(err:HttpErrorResponse){
    if(err.status == 0){}
    else{}
    return throwError(()=>{ new Error("something unexpected happened") })
  }

  createorders(user_id:string,user_type:string){
    let neworderdata = new FormData()
    neworderdata.append("user_id",user_id)
    neworderdata.append("user_type",user_type)
    return this.http.post<SuccessfulOrder[]>(
      `${this.url}/orders/new`,
      neworderdata
    ).pipe(
      retry(2)
    )
  }

  get_buyer_queries(){}
}