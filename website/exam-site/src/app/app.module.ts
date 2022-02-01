import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { TeacherComponent } from './teacher/teacher.component';
import { ExamGeneratorComponent } from './exam-generator/exam-generator.component';
import { HttpClientModule } from '@angular/common/http';
import { TakeExamComponent } from './take-exam/take-exam.component';
import { RetrieveExamComponent } from './retrieve-exam/retrieve-exam.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { ShowQuestionBankComponent } from './show-question-bank/show-question-bank.component';
import { LoaderScreenComponent } from './loader-screen/loader-screen.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DrawerComponent } from './drawer/drawer.component';
import { ListAllVersionExamComponent } from './list-all-version-exam/list-all-version-exam.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TeacherComponent,
    ExamGeneratorComponent,
    TakeExamComponent,
    RetrieveExamComponent,
    ListGroupsComponent,
    AddGroupComponent,
    AddQuestionComponent,
    ShowQuestionBankComponent,
    LoaderScreenComponent,
    SidenavComponent,
    DrawerComponent,
    ListAllVersionExamComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
