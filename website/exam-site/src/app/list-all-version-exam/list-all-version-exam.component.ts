import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, forkJoin } from 'rxjs';
import { AuthService } from '../auth.service';
import { globalConstants } from '../globalConstants';
import { listExamInterface } from '../listExamInterface';
import { loaderInterface } from '../loaderInterface';
import { takeExamInterface } from '../takeExamInterface';

@Component({
  selector: 'app-list-all-version-exam',
  templateUrl: './list-all-version-exam.component.html',
  styleUrls: ['./list-all-version-exam.component.css']
})
export class ListAllVersionExamComponent extends loaderInterface implements OnInit {

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient) {
      super();
    }
  
  versions:takeExamInterface[] = [];
  async ngOnInit() {
    let params = this.route.snapshot.paramMap;
    let examName = params.get('examName');
    let t = this.http.post<[listExamInterface]>(
      globalConstants.listExamUrl, {"userid": this.authService.getUserID()});
    let examInfo:[listExamInterface] = await firstValueFrom(t);
    let httpCalls = [];
    for (let e of examInfo) {
      if(e.examName == examName) {
        for(let c = 1; c <= e.versions; c++) {
          let t1 = this.http.post<takeExamInterface>(globalConstants.retrieveExamUrl, 
            {"examName":e.examName, "version": c});
          httpCalls.push(t1);
        }
        forkJoin(httpCalls).subscribe(vals => {
          for (let v of vals) {
            this.versions.push(v);
          }
          this.showLoader = false;
        });
        break;
      }
    }
  }
}
