const Firestore = require('@google-cloud/firestore');

const db = new Firestore();
  
exports.listExams = async (req, res) => {
    let snapshot = await db.collection('exams').get();
    let exams = [];
    snapshot.forEach(e => {
        console.log(e.data());
        let examsAll = e.data();
        let examv1 = examsAll[1];
        let examObj = {}
        examObj["examName"] = examv1.examname;
        examObj["versions"] = Object.keys(examsAll).length;
        exams.push(examObj);
    });
    res.json(exams);
};
