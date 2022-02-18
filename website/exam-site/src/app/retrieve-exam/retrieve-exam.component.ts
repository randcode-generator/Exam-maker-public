import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';
import { globalConstants } from '../globalConstants';
import { loaderInterface } from '../loaderInterface';
import { retrieveResultsInterface } from '../retrieveResultsInterface';

@Component({
  selector: 'app-retrieve-exam',
  templateUrl: './retrieve-exam.component.html',
  styleUrls: ['./retrieve-exam.component.css']
})
export class RetrieveExamComponent extends loaderInterface implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient) {
      super();
  }
  showExam = false;
  examResult!:retrieveResultsInterface;

   async ngOnInit() {
    let params = this.route.snapshot.paramMap;
    let examName = params.get('examName');
    let t = this.http.post<retrieveResultsInterface>(globalConstants.retrieveResultsUrl, 
      {"examName":examName, "userid": this.authService.getUserID() }, globalConstants.httpOptions);
    this.examResult = await firstValueFrom(t);
    console.log(this.examResult);
    this.showLoader = false;
    this.showExam = true;
  }
}
