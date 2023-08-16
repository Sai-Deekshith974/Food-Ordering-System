import { Component, OnInit } from '@angular/core';
import { SelectedRestaurantService } from 'src/app/services/selected-restaurant.service';
import {DetailsService} from '../../services/details.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bill-generation',
  templateUrl: './bill-generation.component.html',
  styleUrls: ['./bill-generation.component.css']
})
export class BillGenerationComponent implements OnInit {

  constructor(private service:SelectedRestaurantService,private router:Router,private user:DetailsService) { }
  restaurant_name:string="";
  items:any[]=[];
  prices:any[]=[];
  quantity:any[]=[];
  total:number=0;
  date:string;
  ngOnInit(): void {
    let data=JSON.parse(localStorage.getItem('in_restaurant'));
    this.restaurant_name=data.name;
    this.items.push(this.service.items);
    this.prices.push(this.service.prices);
    this.quantity.push(this.service.quantity);
    this.items[0][0].forEach((item,index)=>{
      this.total=this.total+this.prices[0][0][index]*this.quantity[0][0][index];
    });
  }
  logout(){
    this.user.logout();
    this.router.navigate(['/login']);
  }
  cancel(){
    this.router.navigate(['/dashboard']);
  }
  gotobill(){
    alert("Payment Successfull!!");
    this.service.update_Order();
    this.router.navigate(['/dashboard']);
  }

}
