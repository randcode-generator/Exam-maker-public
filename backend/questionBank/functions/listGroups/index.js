const Firestore = require('@google-cloud/firestore');

const db = new Firestore();

exports.listGroups = async (req, res) => {
    const snapshot = await db.collection('question_group').get();
    let arr = []
    snapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    res.json(arr);
};
