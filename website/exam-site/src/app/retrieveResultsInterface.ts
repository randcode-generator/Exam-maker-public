interface questionsInterface {
  answer: string;
  id: string;
  shuffledKeys: string[];
  question: string;
  answers: {[key: string]: string};
}

export interface retrieveResultsInterface {
  examname: string;
  grade: number;
  version: number;
  questions: questionsInterface[];
}
