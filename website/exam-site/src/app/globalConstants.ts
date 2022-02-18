import { HttpHeaders } from "@angular/common/http";

export class globalConstants {
  public static baseURL="<ENDPOINTURL>";
  public static addGroupUrl = globalConstants.baseURL + "/addGroup";
  public static addQuestionUrl = globalConstants.baseURL + "/addQuestion";
  public static listGroupsUrl = globalConstants.baseURL + "/listGroups";
  public static generateExamUrl = globalConstants.baseURL + "/generateExam";
  public static saveExamUrl = globalConstants.baseURL + "/saveExam";
  public static listQuestionsByGroupUrl = globalConstants.baseURL + "/listQuestionsByGroup";
  public static submitExamUrl = globalConstants.baseURL + "/submitexam";
  public static listExamUrl = globalConstants.baseURL + "/listExams";
  public static retrieveExamTakenUrl = globalConstants.baseURL + "/retrieveExamTaken";
  public static retrieveResultsUrl = globalConstants.baseURL + "/retrieveResults";
  public static retrieveExamUrl = globalConstants.baseURL + "/retrieveExam";
  public static deleteQuestion = globalConstants.baseURL + "/deleteQuestion";
  public static deleteGroup = globalConstants.baseURL + "/deleteGroup";
  public static deleteExamTaken = globalConstants.baseURL + "/deleteExamTaken";
  public static deleteExam = globalConstants.baseURL + "/deleteExam";
  
  public static httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}