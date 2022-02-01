import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { globalConstants } from '../globalConstants';
import { loaderInterface } from '../loaderInterface';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent extends loaderInterface implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient) {
      super();
  }

  groups:any = [];
  checkoutForm = this.formBuilder.group({
    group: "",
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: ""
  });

  async ngOnInit() {
    let t = this.http.get(globalConstants.listGroupsUrl, globalConstants.httpOptions);
    this.groups = await firstValueFrom(t);
    this.showLoader = false;
  }
  onAddQuestion() {
    this.showLoader = true;
    let values = this.checkoutForm.value;
    let answersObj:any = {};
    for (let i of [1,2,3,4]) {
      answersObj["answer" + i] = values["answer" + i];
    };
    let obj = {
      "group": values.group,
      "question": values.question,
      "answers": answersObj
    };
    console.log(obj);
    this.http.post(globalConstants.addQuestionUrl, obj, globalConstants.httpOptions)
      .subscribe(x => {
        this.router.navigate(['/show-questions-bank']);
      });
  }
}
