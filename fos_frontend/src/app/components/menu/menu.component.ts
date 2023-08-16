import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';
import {SelectedRestaurantService} from '../../services/selected-restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router,private user:DetailsService,private items_service:SelectedRestaurantService) { }
  restaurant_name:string="";
  items:any[]=[];
  prices:any[]=[];
  selected_items=[];
  selected_quantity=[];
  selected_prices=[];
  ngOnInit(): void {
    let data=JSON.parse(localStorage.getItem('in_restaurant'));
    this.restaurant_name=data.name;
    this.items.push(data.menu[0]);
    this.prices.push(data.menu[1]);
  }
  logout(){
    this.user.logout();
    this.router.navigate(['/login']);
  }
  book(index){
      let id=(<HTMLInputElement>document.getElementById('id'+index)).value;
      this.selected_quantity.push(id);
      this.selected_items.push(this.items[0][index]);
      this.selected_prices.push(this.prices[0][index]);
      console.log(this.selected_items);
  }
  cancel(){
    this.router.navigate(['/dashboard']);
  }
  gotobill(table_no){
    this.items_service.table_no=table_no.value;
    console.log(this.items_service.table_no);
    this.items_service.setItems(this.selected_items,this.selected_prices,this.selected_quantity);
    this.router.navigate(['/bill']);
  }

}
