import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class Communications {
  private setSideBarSource = new Subject<boolean>();
  sideBarStream$ = this.setSideBarSource.asObservable();

  setSideBar(open: boolean) {
    this.setSideBarSource.next(open);
  }
}
