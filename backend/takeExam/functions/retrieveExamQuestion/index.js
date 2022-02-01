const Firestore = require('@google-cloud/firestore');

const db = new Firestore();
  
exports.retrieveExamQuestions = async (req, res) => {
    let exam = req.body.examWithQuestions;
    let questions = exam.questions;
    for (const question of questions) {
        let snapshot = await db.collection('question_bank').doc(question.id).get()
        let data = snapshot.data();
        question.answers = data.answers;
        question.question = data.question;
    }
    res.json(exam);
};
