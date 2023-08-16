import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DetailsService } from 'src/app/services/details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private http:HttpClient,private user:DetailsService,private router:Router) {}
  todos:any[]=[];
  filtered:any[]=this.todos[0];
  search1:string="";
  check:boolean=true;
  ngOnInit(): void {
    this.http.get('http://localhost:4000/restaurants').subscribe(prods=>{
        // console.log(prods);
        this.todos.push(prods);
        for(let i=0;i<this.todos[0].length;i++){
          this.todos[0][i]["id"]=i;
        }
        console.log(this.todos);
        console.log(this.user.user);
    })
    console.log(localStorage.getItem('id_user'));
  }
  changeUserName(e){
    this.search1=e.target.value;
  }
  search_bar(val){
    this.search1=val.value;
    if(this.search1.length==0){
      this.check=true;
    }
    else
    {
      this.check=false;
      let tmp=this.search1.toLowerCase();
    this.filtered = this.todos[0].filter(function(value1){ 
      let temp=value1.name.toLowerCase();
      console.log(tmp);
      return temp.indexOf(tmp)!=-1;
    });
    }

  }
  reserve(req_id){
    console.log(req_id);
    let in_restaurant=this.todos[0].find((arr)=>{
      console.log(arr);
      return arr.id==req_id;
    });
    let temp=JSON.stringify(in_restaurant);
    localStorage.setItem('in_restaurant',temp);
    this.router.navigate(['/menu']);
  }
  logout(){
    this.user.logout();
    this.router.navigate(['/login']);
  }
  add(todo){
    this.todos.push({id:this.todos.length,value:todo.value,isDelete:false});
    todo.value="";
  }
  delete(id){
    this.todos[id].isDelete=true;
  }
}
