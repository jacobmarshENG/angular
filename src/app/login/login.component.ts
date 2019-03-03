import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators ,FormControl, Validator } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute}  from '@angular/router';
import { SharedService } from './../services/shared.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  className:any;
  msg:any;
  public loginStatus :boolean = false;
  public isSubmitted :boolean = false;
  constructor(private sharedservice : SharedService, private router : Router) { }

  ngOnInit() {
    this.form = new FormGroup({
			email : new FormControl('',[Validators.required,Validators.email]),
			password : new FormControl('',Validators.required)
		});
  }

  submitForm(form){
   this.isSubmitted = true;
   if(this.form.valid){
		let email = form.value.email;
    let password = form.value.password;
    const body = {
        email:email,
        pass:password
      };

  this.sharedservice.postDataToService('login', body)
      .subscribe(
        res => {
          try {
              this.loginStatus = true;
              if(res.status && res.statusCode == 200){
                this.isSubmitted = false;
                this.form.reset();
                this.className = 'success';
                this.msg = res.msg;
                setTimeout(() => {  this.router.navigate(['/dashboard']); }, 2000);
              }else{
                this.className = 'danger';
                this.msg = res.msg;
              }
          } catch (e) {
            console.log('Success Exception LoginComponent sharedService' + e);
          }
        },
        err => {
          try {
            console.log('Error :' + err);
          } catch (e) {
            console.log('Error Exception LoginComponent sharedService ' + e);
            
          }
        }
      );

    }else{
      console.log('invalid input');
    }
    }


}
