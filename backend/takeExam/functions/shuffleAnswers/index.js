function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function restoreAnswer(orginal_answer, shuffled_keys) {
    let answers = {};
    for(let key of shuffled_keys) {
        answers[key] = orginal_answer[key];
    }
    return answers;
}

exports.shuffleAnswers = async (req, res) => {
    let exam = req.body;
    let questions = exam.questions;
    for (let question of questions) {
        console.log("shuffling");
        let keys = Object.keys(question.answers);
        let shuffled_keys = shuffle(keys);
        question.shuffled_keys = shuffled_keys;
    }
    console.log(exam);
    res.json(exam);
};
