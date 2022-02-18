const Firestore = require('@google-cloud/firestore');

const db = new Firestore();

exports.deleteGroup = async (req, res) => {
    console.log(req.body);
    let group = req.body.group;
    try {
        let ref1 = db.collection('question_bank')
            .where("group", "==", group)
            .limit(1);

        await db.runTransaction(async (transaction) => {
            let snapshot1 = await transaction.get(ref1);
            let count = 0;
            snapshot1.forEach((doc) => {
                count += 1;
            });
            if(count == 0) {
                await db.collection('question_group').doc(group).delete();
            } else {
                throw 'Cannot delete group with associated questions'
            }
        });
        console.log('Transaction success!');
        res.json({"status": "success"});
    } catch(e) {
        console.log('Transaction failure:', e);
        res.json({"status": "error", "message": e});
    }
    
    res.json({"status": "success"});
};
