const Firestore = require('@google-cloud/firestore');

const db = new Firestore();

exports.addQuestion = async (req, res) => {
    console.log(req.body);
    let group = req.body.group;
    let question = req.body.question;
    let answers = req.body.answers;
    try {
        let ref1 = db.collection('question_bank')
            .where("group", "==", group)
            .orderBy('index', 'desc')
            .limit(1);

        await db.runTransaction(async (transaction) => {
            let snapshot1 = await transaction.get(ref1);
            let indexNew = 1;
            let newdoc = group+""+indexNew;
            snapshot1.forEach((doc) => {
                let data = doc.data();
                indexNew = data.index + 1;
                newdoc = group+""+indexNew;
            });
            let ref2 = db.collection("question_bank").doc(newdoc);
            let newobj = {
                "index": indexNew, 
                "group": group, 
                "id": newdoc,
                "question": question,
                "answers": answers
            };
            transaction.set(ref2, newobj);
        });
        console.log('Transaction success!');
        res.json({"status": "success"});
    } catch(e) {
        console.log('Transaction failure:', e);
        res.json({"status": "error"});
    }
};
