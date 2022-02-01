export interface questionsInterface {
  id: number;
  group: string;
  question: string;
  answers: {[key: string]: string};
  shuffled_keys: string[];
}

export interface takeExamInterface {
  examname: string;
  version: number;
  questions: questionsInterface[];
}