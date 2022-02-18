const Firestore = require('@google-cloud/firestore');

const db = new Firestore();
  
exports.retrieveResults = async (req, res) => {
    let body = req.body;
    let userid = body.userid;
    let examName = body.examName;
    let snapshot = await db.collection('submitted_exams').doc(examName + "_" + userid).get()
    let data = snapshot.data();
    res.json(data);
};
