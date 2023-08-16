import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,private user:DetailsService) { }
  res:any[]=[];
  ngOnInit(): void {
  }
  signup(firstname,lastname,mobileno,emailid,password,cpassword){
    if(cpassword.value==password.value){
      var temp={firstname:firstname.value,lastname:lastname.value,mobileno:mobileno.value,emailid:emailid.value,password:password.value};
      this.http.post('http://localhost:4000/register',temp).subscribe(prods=>{
        this.res.push(prods);
        if(this.res[0].message=='success'){
            this.user.setUser(this.res[0]);
            console.log(this.user.user);
            this.router.navigate(['/dashboard']);              
        }
        else
        {
          alert('user already exists!!');
        }
      })      
  }
  else{
    alert("passwords doesn't match");
  }
  }

}
