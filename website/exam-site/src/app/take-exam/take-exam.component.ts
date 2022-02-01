import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';
import { globalConstants } from '../globalConstants';
import { listExamInterface } from '../listExamInterface';
import { loaderInterface } from '../loaderInterface';
import { takeExamInterface } from '../takeExamInterface';

@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent extends loaderInterface implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient) {
      super();
  }

  versionsArr: string[] = [];
  examsArr: string[] = [];
  examForm = this.formBuilder.group({
    answers: new FormArray([new FormControl()])
  });

  examSelectForm = this.formBuilder.group({
    examName: '',
    versions: ''
  });
  examToTake!: takeExamInterface;
  showExam = false;
  examInfo:any = {};

  async ngOnInit() {
    let t = this.http.post<[listExamInterface]>(
      globalConstants.listExamUrl, {"userid": this.authService.getUserID()});
    let examInfo:[listExamInterface] = await firstValueFrom(t);
    for(let exam of examInfo) {
      this.examsArr.push(exam.examName);
      this.examInfo[exam.examName] = exam;
    }
    this.showLoader = false;
  }
  
  async onTakeExam() {
    this.showLoader = true;
    let formValues = this.examSelectForm.value

    let t = this.http.post<takeExamInterface>(globalConstants.retrieveExamUrl, 
      {"examName":formValues.examName, "version":formValues.versions});
    
    this.examToTake = await firstValueFrom(t);
    this.showExam = true;
    let formControlArr = 
      this.examToTake.questions.map(_ => new FormControl());
    this.examForm = this.formBuilder.group({
      answers: new FormArray(formControlArr)
    });
    this.showLoader = false;
  }

  onSubmitExam() {
    this.showLoader = true;
    let questionsArr: any = []
    for (let [index, questions] of this.examToTake.questions.entries()) {
      questionsArr.push({
        "id": questions.id,
        "shuffledKeys" :questions.shuffled_keys,
        "answer": this.examForm.value.answers[index]
      });
    }
    let examObj:any = {
      "examName": this.examToTake.examname,
      "version": this.examToTake.version,
      "userid": this.authService.getUserID(),
      "questions": questionsArr
    }
    this.http.post(globalConstants.submitExamUrl, examObj)
      .subscribe(x=> {
        this.router.navigate(['/teacher']);
      });
  }

  examSelected() {
    let examName = this.examSelectForm.value.examName;
    this.versionsArr = [];
    for(let i = 1; i <= this.examInfo[examName].versions; i++) {
      this.versionsArr.push(i.toString());
    }
  }
}
