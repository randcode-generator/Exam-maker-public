const Firestore = require('@google-cloud/firestore');

const db = new Firestore();

exports.listQuestionsByGroup = async (req, res) => {
    const snapshot = await db.collection('question_bank')
                        .where("group", "==", req.body.group).get();
    let arr = []
    snapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    res.json(arr);
};
