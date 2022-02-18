import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AuthGuard } from './auth.guard';
import { ExamGeneratorComponent } from './exam-generator/exam-generator.component';
import { ListAllVersionExamComponent } from './list-all-version-exam/list-all-version-exam.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { LoginComponent } from './login/login.component';
import { RetrieveExamComponent } from './retrieve-exam/retrieve-exam.component';
import { ShowQuestionBankComponent } from './show-question-bank/show-question-bank.component';
import { TakeExamComponent } from './take-exam/take-exam.component';
import { TeacherComponent } from './teacher/teacher.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'teacher', component: TeacherComponent, canActivate:[AuthGuard] },
  { path: 'exam-generator', component: ExamGeneratorComponent, canActivate:[AuthGuard] },
  { path: 'take-exam', component: TakeExamComponent, canActivate:[AuthGuard] },
  { path: 'retrieve-exam/:examName', component: RetrieveExamComponent, canActivate:[AuthGuard] },
  { path: 'list-groups', component: ListGroupsComponent, canActivate:[AuthGuard] },
  { path: 'add-group', component: AddGroupComponent, canActivate:[AuthGuard] },
  { path: 'show-questions-bank', component: ShowQuestionBankComponent, canActivate:[AuthGuard] },
  { path: 'add-question', component: AddQuestionComponent, canActivate:[AuthGuard] },
  { path: 'list-all-version-exam/:examName', component: ListAllVersionExamComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
