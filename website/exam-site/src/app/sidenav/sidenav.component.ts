import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService) { }
  
  ngOnInit(): void {
  }

  onHome() {
    this.router.navigate(['/teacher']);
  }
  onGenerateExam() {
    this.router.navigate(['/exam-generator']);
  }
  onTakeExam() {
    this.router.navigate(['/take-exam']);
  }
  onGroups() {
    this.router.navigate(['/list-groups']);
  }
  onQuestionBank() {
    this.router.navigate(['/show-questions-bank']);
  }
  onLogout() {
    this.authService.SignOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }
}
