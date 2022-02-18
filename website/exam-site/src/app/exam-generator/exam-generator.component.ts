import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { questionsInterface } from '../questionsInterface';
import { firstValueFrom, forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { groupsInterface } from '../groupsInterface';
import { loaderInterface } from '../loaderInterface';
import { globalConstants } from '../globalConstants';

@Component({
  selector: 'app-exam-generator',
  templateUrl: './exam-generator.component.html',
  styleUrls: ['./exam-generator.component.css']
})
export class ExamGeneratorComponent extends loaderInterface implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient) {
      super();
  }

  versionsArr: string[] = ['1', '2', '3'];
  groups: any = [];
  versionsExam: questionsInterface[][] = [];
  exam_saved:any = [];
  showExam = false;

  checkoutForm = this.formBuilder.group(
    {examName: '', 
     versions: '', 
     groups: ''
    });
  async ngOnInit() {
    let t = this.http.get<groupsInterface[]>(globalConstants.listGroupsUrl, globalConstants.httpOptions);
    let t1 = await firstValueFrom(t);
    for (let te of t1) {
      this.groups.push(te.name);
    }
    let s = this.groups.map(() => new FormControl(false));
    let groupAtt: any = {
      examName: '',
      versions: '1',
      groups: new FormArray(s)
    };
    this.checkoutForm = this.formBuilder.group(groupAtt);
    this.showLoader = false;
  }
  
  onSaveExam() {
    this.showLoader = true;
    let versionNum = 0;
    for (let exams of this.versionsExam) {
      let obj:any = {};
      let questions = [];
      versionNum++;
      for (let question of exams) {
        questions.push({ "id": question.id });
      }
      obj['version'] = versionNum;
      obj['questions'] = questions;
      obj['examname'] = this.checkoutForm.value.examName;
      this.exam_saved.push(obj);
    }
    this.http.post<questionsInterface[]>(globalConstants.saveExamUrl, {"savedExam": this.exam_saved})
      .subscribe(x=> {
        this.showLoader = false;
        this.router.navigate(['/teacher']);
      });
  }

  async onGenerateExam() {
    this.showLoader = true;
    this.showExam = true;
    let index = 0;
    let groups2 = [];
    for (let g of this.checkoutForm.value.groups) {
      if(g)
        groups2.push(this.groups[index]);
      index++;
    }

    this.versionsExam = [];
    let httpCalls = [];
    for (let i = 0; i < this.checkoutForm.value.versions; i++) {
      let t = this.http.post<questionsInterface[]>(globalConstants.generateExamUrl, {"groups":groups2});
      httpCalls.push(t);
    }

    forkJoin(httpCalls).subscribe(vals => {
      console.log(vals);
      for (let v of vals)
        this.versionsExam.push(v);
      this.showLoader = false;
    });
  }
}
