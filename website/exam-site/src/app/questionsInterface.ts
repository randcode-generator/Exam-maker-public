export interface questionsInterface {
  id: number;
  group: string;
  question: string;
  answers: {[key: string]: string};
  shuffled_keys: string[];
}
