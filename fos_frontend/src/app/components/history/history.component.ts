import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private service:DetailsService,private router:Router) { }
  user_history:any[]=[];
  into_sentence:any[]=[];
  ngOnInit(): void {
    this.service.getHistory();
    this.user_history=this.service.user_history;
    // for(let i=0;i<this.user_history.length;i++){
    //   console.log("user_history ");
    //   let temp="You have ordered the items: \n";
    //   for(let j=0;j<this.user_history[i].items.length;j++){
    //     if(j!=this.user_history[i].items.length-1){
    //       temp=temp+this.user_history[i].items[j]+"("+this.user_history[i].quantity[j]+")"+" with price Rs."+this.user_history[i].prices[j]+" at "+this.user_history[i].time+", ";
    //     }
    //     else{
    //       temp=temp+" and "+this.user_history[i].items[j]+"("+this.user_history[i].quantity[j]+")"+" with price Rs."+this.user_history[i].prices[j]+" at "+this.user_history[i].time+".";
    //     }
    //   }
    //   console.log("temp "+temp);
    //   this.into_sentence.push(temp);
    // }
    // console.log(this.user_history);
    // console.log(this.into_sentence);
  }
  logout(){
    this.service.logout();
    this.router.navigate(['/login']);
  }

}
