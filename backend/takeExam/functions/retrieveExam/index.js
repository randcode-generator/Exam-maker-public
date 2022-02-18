const Firestore = require('@google-cloud/firestore');

const db = new Firestore();
  
exports.retrieveExam = async (req, res) => {
    let examName = req.body.examName;
    let version = req.body.version;
    const snapshot = await db.collection('exams').doc(examName).get();
    let data = snapshot.data();
    console.log(req.body);
    console.log(data);
    let versionToReturn = data[version];
    console.log(versionToReturn)
    res.json(versionToReturn);
};
