const Firestore = require('@google-cloud/firestore');

const db = new Firestore();

exports.deleteQuestion = async (req, res) => {
    console.log(req.body);
    let questionid = req.body.questionid;
    await db.collection('question_bank').doc(questionid).delete();
    res.json({"status": "success"});
};
