import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { globalConstants } from '../globalConstants';
import { loaderInterface } from '../loaderInterface';
import { questionsInterface } from '../takeExamInterface';

@Component({
  selector: 'app-show-question-bank',
  templateUrl: './show-question-bank.component.html',
  styleUrls: ['./show-question-bank.component.css']
})
export class ShowQuestionBankComponent extends loaderInterface implements OnInit {

  constructor(private http: HttpClient,
    private router: Router) {
      super();
  }
  
  groups: any = [];
  questions: any = [];
  
  async ngOnInit() {
    let t = this.http.get(globalConstants.listGroupsUrl, globalConstants.httpOptions);
    this.groups = await firstValueFrom(t);
    this.showLoader = false;
  }

  async groupSelected(event: any) {
    this.showLoader = true;
    let t = this.http.post(globalConstants.listQuestionsByGroupUrl, 
            { "group": event.value }, globalConstants.httpOptions);
    this.questions = await firstValueFrom(t);
    console.log(this.questions);
    this.showLoader = false;
  }

  onAddQuestion() {
    this.router.navigate(['/add-question']);
  }
  onDelete(questionid: string) {
    let t = this.http.post(globalConstants.deleteQuestion, 
      { "questionid": questionid }, globalConstants.httpOptions);
    t.subscribe(x => {
      console.log(x);
      window.location.reload();
    });
  }
}
