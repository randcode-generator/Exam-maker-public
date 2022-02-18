const Firestore = require('@google-cloud/firestore');

const db = new Firestore();

exports.deleteExamTaken = async (req, res) => {
    console.log(req.body);
    let userid = req.body.userid;
    let examName = req.body.examName;
    await db.collection('submitted_exams').doc(examName + "_" + userid).delete();
    res.json({"status": "success"});
};
