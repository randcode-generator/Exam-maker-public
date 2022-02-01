const Firestore = require('@google-cloud/firestore');

const db = new Firestore();
  
exports.retrieveExamTaken = async (req, res) => {
    let body = req.body;
    let userid = body.userid;
    let snapshot = await db.collection('submitted_exams')
        .where('userid', '==', userid).get()
    
    let data = [];
    snapshot.forEach((doc) => {
        data.push(doc.data());
    });
    res.json(data);
};
