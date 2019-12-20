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

  public form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    house_number: new FormControl('', Validators.required),


  });
  public newUser = new User();
  public allUsers: User[];

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(u => this.allUsers = u);
  }

  public addUser(): any {
    let validate = true;

    this.allUsers.map(u => {
      if (u.email === this.newUser.email) {
        alert("This email already exist in the website.");
        validate = false;
        return;
      }
    });
    if (validate) {
      this.usersService.addUser(this.newUser).subscribe(user => {
        alert("New user has been added.");
        this.router.navigate(["/login"]);
      }, err => console.log("Error: " + err.message));
    }
  }

}
