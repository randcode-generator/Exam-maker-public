import { Component } from '@angular/core';
import { Communications } from '../communications';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent {

  constructor(private comms: Communications) {
    this.comms.sideBarStream$.subscribe(x => {
      this.opened = x;
    })
  }

  opened = true;
}
