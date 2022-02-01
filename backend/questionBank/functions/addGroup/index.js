const Firestore = require('@google-cloud/firestore');

const db = new Firestore();

exports.addGroup = async (req, res) => {
    console.log(req.body);
    let name = req.body.name;
    let description = req.body.description;
    await db.collection("question_group").doc(name).set({
        "name": name,
        "description": description
    });

    res.json({"status": "success"});
};
