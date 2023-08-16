import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DetailsService} from '../../services/details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private http:HttpClient,private user:DetailsService) { }
  check:boolean=true;
  ngOnInit(): void {
  }
  login(emailid,password){
    let user={emailid:emailid.value,password:password.value};
    this.http.post('http://localhost:4000/login',user).subscribe((prods)=>{
      if(prods[0].message=="success"){
        this.user.setUser(prods[0]);
        console.log(this.user.user);
        this.router.navigate(['/dashboard']);
      }
      else
      {
        this.check=false;
      }
    })
  }

}
