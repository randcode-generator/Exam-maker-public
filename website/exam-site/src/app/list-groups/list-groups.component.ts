import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { globalConstants } from '../globalConstants';
import { loaderInterface } from '../loaderInterface';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.css']
})
export class ListGroupsComponent extends loaderInterface implements OnInit {

  constructor(private http: HttpClient,
    private router: Router) {
      super();
  }
  groups:any = [];
  showError = false;
  errorMessage = "";

  async ngOnInit() {
    let t = this.http.get(globalConstants.listGroupsUrl, globalConstants.httpOptions);
    this.groups = await firstValueFrom(t);
    this.showLoader = false;
  }
  onAddGroup() {
    this.router.navigate(['/add-group']);
  }
  onDelete(group: string) {
    let t = this.http.post(globalConstants.deleteGroup, 
      { "group": group }, globalConstants.httpOptions);
    t.subscribe((x:any) => {
      console.log(x);
      if(x.status == "success")
        window.location.reload();
      else {
        this.showError = true;
        this.errorMessage = x.message;
      }
    });
  }
}
