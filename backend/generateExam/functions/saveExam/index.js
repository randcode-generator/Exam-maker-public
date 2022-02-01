const Firestore = require('@google-cloud/firestore');

const db = new Firestore();

exports.saveExam = async (req, res) => {
    const snapshot = await db.collection('exams');
    let exam = req.body.exam;
    let body2 = {};
    body2[exam.version] = {
        "version": exam.version,
        "examname": exam.examname,
        "questions": exam.questions 
    };
    await snapshot.doc(exam.examname).set(body2, { merge: true });
    res.send({"status": "success"});
};