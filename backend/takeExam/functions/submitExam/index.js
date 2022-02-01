const Firestore = require('@google-cloud/firestore');

const db = new Firestore();
  
exports.submitExam = async (req, res) => {
    console.log(req.body);
    let submission = req.body;
    let examName = submission.examName;
    let userid = submission.userid;
    await db.collection('submitted_exams').doc(examName + "_" + userid).set(req.body);

    res.json({"status": "success"});
};
