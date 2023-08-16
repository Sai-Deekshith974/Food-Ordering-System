import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  constructor(private http:HttpClient) { }
  user:any[]=[];
  user_history:any[]=[];
  user_profile_data:any[]=[];
  setUser(arr){
    console.log(arr);
    localStorage.setItem('id_user',arr._id);
    this.user=[];
    this.user.push(arr);
  }
  getUser(){
    let user_profile=localStorage.getItem('id_user');
    this.http.get('http://localhost:4000/user?id='+user_profile).subscribe(prods=>{
      // this.user_profile_data=[];
      // while(this.user_profile_data.length>0){
      //   this.user_profile_data.pop();
      // }
      this.user_profile_data.push(prods[0]);
    })
  }
  getHistory(){
    let id=localStorage.getItem('id_user');
    this.http.get('http://localhost:4000/history?id='+id).subscribe(prods=>{
        for(let i=0;i<prods[0].history.length;i++){
          this.user_history.push(prods[0].history[i]);
        }
    })
    console.log(this.user_history);
  } 
  update_user(firstname,lastname,mobileno,new_password){
    let arr={firstname:firstname,lastname:lastname,mobileno:mobileno,password:new_password,id:localStorage.getItem('id_user')};
    this.http.post('http://localhost:4000/update_user',arr).subscribe(prods=>{
      this.user_profile_data=[];
      this.user_profile_data.push(prods[0]);
      console.log(this.user_profile_data);
    })
  }
  logout(){
    this.user=null;
    localStorage.clear();
  }
}
