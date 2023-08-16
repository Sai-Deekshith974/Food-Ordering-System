import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private service:DetailsService,private router:Router) { }
  user_profile:any[]=[];
  ngOnInit(): void {
    this.service.getUser();
    this.user_profile.push(this.service.user_profile_data);
    console.log(this.user_profile);
  }
  logout(){
    this.service.logout();
    this.router.navigate(['/login']);
  }
  update(firstname,lastname,mobileno,new_password,confirm_password){
    if(new_password.value!=confirm_password.value){
      alert("Check password again");
    }
    else{
      this.service.update_user(firstname.value,lastname.value,mobileno.value,new_password.value);
      this.user_profile=[];
      this.user_profile.push(this.service.user_profile_data);
    }
  }

}
