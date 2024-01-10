import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr'




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService) {

  }

  

  registerform = this.builder.group({
    id: this.builder.control('',Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9._]*$")])),
    name: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3),Validators.pattern("^[a-zA-Z0-9._]*$")])),
    lastname:this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
    phoneno:this.builder.control("",Validators.compose([Validators.maxLength(10) ,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.required])),
    password: this.builder.control('',Validators.compose([Validators.required,Validators.minLength(8)]),),
    email: this.builder.control('',Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control(''),
    role: this.builder.control(''),
    isactive: this.builder.control(false),
    dob:this.builder.control('',Validators.compose([Validators.required])),
    userrole:this.builder.control('',Validators.compose([Validators.required]))
  });

  proceedregister() {
    if (this.registerform.valid) {
      this.service.RegisterUser(this.registerform.value).subscribe(result => {
        this.toastr.success('Registered successfully')
        this.router.navigate(['login'])
        console.log(this.registerform.value)
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

  // UsernameisExists(){
  //   try {
  //     if (this.registerform.u) {
        
  //     } else {
        
  //     }

  //   } catch (error) {
  //     this.toastr.warning("Email Already Exists")
  //   }
  // }

}

function ouput(target: RegisterComponent, propertyKey: 'selected'): void {
  throw new Error('Function not implemented.');
}

