import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  
  public newUser = new User();
  public allUsers: User[];
  public confirmPassword : string ;
  public passwordMessage : string;
  public emailError : string;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(u => this.allUsers = u);
  }

  public addUser(): any {
    let validate = true;

    // this.allUsers.map(u => {
    //   if (u.email === this.newUser.email) {
    //     alert("This email already exist in the website.");
    //     validate = false;
    //     return;
    //   }
    // });
    if (validate) {
      this.usersService.addUser(this.newUser).subscribe(user => {
        alert("New user has been added.");
        this.router.navigate(["/login"]);
      }, err => console.log("Error: " + err.message));
    }
  }

  public passwordToConfirm():void{

    this.passwordMessage='';

if(this.newUser.password !== this.confirmPassword){

  this.passwordMessage = "this password is not correct"
}
  }

  public checkEmail():void{
    this.emailError = "";

    this.allUsers.map(c => {
    
      if (c.email === this.newUser.email) {
        this.emailError = "this email is already in the system, please choose another one";
      }
    })
  }





  public backButton():void{
    this.router.navigate(["/login"]);
  }

}
