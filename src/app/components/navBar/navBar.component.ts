import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { User } from 'src/app/models/user';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';

@Component({
  selector: 'app-header',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.scss']
})
export class HeaderComponent implements OnInit {

  public connectedUser: User;
  public toggle: any = document.getElementById("toggle");
  public resize: any = document.getElementById("resize");

  constructor(private redux: NgRedux<AppState>) { }

  public ngOnInit() {
    this.redux.subscribe(() => {
      this.connectedUser = this.redux.getState().logged;
    });
  }

  public activateMenu(): void {
    this.toggle = document.getElementById("toggle");
    this.resize = document.getElementById("resize");
    $(this.toggle).toggleClass('on');
    $(this.resize).toggleClass('active');
  }

}
