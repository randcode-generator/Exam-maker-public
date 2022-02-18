import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { loaderInterface } from '../loaderInterface';
import{ globalConstants } from '../globalConstants';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent extends loaderInterface implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient) {
      super();
  }

  checkoutForm = this.formBuilder.group({
    name: "",
    description: ""
  });

  ngOnInit(): void {
    this.showLoader = false;
  }

  onAddGroup() {
    this.showLoader = true;
    let values = this.checkoutForm.value;
    console.log(values);
    this.http.post(globalConstants.addGroupUrl, values, globalConstants.httpOptions)
      .subscribe(x => {
        this.router.navigate(['/list-groups']);
      });
  }
}
