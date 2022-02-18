const Firestore = require('@google-cloud/firestore');

const db = new Firestore();

exports.deleteExam = async (req, res) => {
    console.log(req.body);
    let examName = req.body.examName;
    await db.collection('exams').doc(examName).delete();
    res.json({"status": "success"});
};
