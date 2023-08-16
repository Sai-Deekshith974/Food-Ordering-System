import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedRestaurantService {

  constructor(private http:HttpClient) { }
  items:any[]=[];
  prices:any[]=[];
  quantity:any[]=[];
  table_no:number=0;
  date:string;
  setItems(arr,price,quantity){
    this.items.push(arr);
    this.prices.push(price);
    this.quantity.push(quantity);
  }
  update_Order(){
    let restaurant_id=JSON.parse(localStorage.getItem('in_restaurant'));
    console.log("restaurant id: "+restaurant_id._id);
    let date=new Date();
    let date1=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    let hours=date.getHours();
    if(hours>12){
	    hours=hours-12;
    }
    this.date=date1+" "+hours+":"+date.getMinutes()+":"+date.getSeconds();
    console.log(this.date);
    let details={user_id:localStorage.getItem('id_user'),res_id:restaurant_id._id,items:this.items,prices:this.prices,quantity:this.quantity,table_no:this.table_no,time:this.date};
    this.http.post('http://localhost:4000/order',details).subscribe(prods=>{
      console.log(prods);
    })
  }
}
