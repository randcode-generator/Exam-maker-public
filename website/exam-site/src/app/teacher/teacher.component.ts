import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';
import { globalConstants } from '../globalConstants';
import { listExamInterface } from '../listExamInterface';
import { loaderInterface } from '../loaderInterface';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent extends loaderInterface implements OnInit {
  examTakenList!:any;
  examList!: listExamInterface[];
  
  constructor(private router: Router,
    private authService: AuthService,
    private http: HttpClient) {
      super();
  }

  async ngOnInit() {
    let t = this.http.post(globalConstants.retrieveExamTakenUrl, 
      {"userid": this.authService.getUserID() }, globalConstants.httpOptions);
    this.examTakenList = await firstValueFrom(t);
    let t1 = this.http.post<[listExamInterface]>(
      globalConstants.listExamUrl, {"userid": this.authService.getUserID()});
    this.examList = await firstValueFrom(t1);
    console.log(this.examList)
    this.showLoader = false;
  }

  viewExam(examName:string) {
    this.router.navigate(['/retrieve-exam', examName]);
  }
  viewExamAllVersion(examName:string) {
    this.router.navigate(['/list-all-version-exam', examName]);
  }

  async onDeleteExamTaken(examTaken:string) {
    console.log("ondelete")
    this.showLoader = true;
    let t = this.http.post(globalConstants.deleteExamTaken, 
      {"userid": this.authService.getUserID(), "examName": examTaken }, globalConstants.httpOptions);
    await firstValueFrom(t);
    window.location.reload();
  }
  async onDeleteExam(examTaken:string) {
    console.log("ondeleteexam")
    this.showLoader = true;
    let t = this.http.post(globalConstants.deleteExam, 
      {"userid": this.authService.getUserID(), "examName": examTaken }, globalConstants.httpOptions);
    await firstValueFrom(t);
    window.location.reload();
  }
}
