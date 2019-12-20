import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {
  // modal inputs + alias
  @Input('alert') alertStyle: any;
  @Input('header') heading: any;
  @Input('message') modalMessage: any;
  @Input('continue') continueShopping: string;
  @Input('start') startShopping: string;
  @Input('submit') modalSubmit: any;

  constructor(private router: Router) { }

  public goToProducts(): void {
    this.router.navigate(["/products"]);
  }

}
