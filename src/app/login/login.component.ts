import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formvalue!:FormGroup;
  constructor(private data:FormBuilder,
    private router: Router) { }
  
  ngOnInit(): void {
  this.formvalue=this.data.group({
  email:new FormControl('',[Validators.required]),
  password:new FormControl('',[Validators.required])
  })
  }

loginUser(){
  if(this.formvalue.value.email === "admin@gmail.com" && this.formvalue.value.password === "1234"){
    this.router.navigate(['/list'])
  }
  else  
  {
    alert("User id & password Not Match");
  }
}

}
