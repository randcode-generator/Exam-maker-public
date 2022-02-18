const Firestore = require('@google-cloud/firestore');

const db = new Firestore();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
  
exports.getQuestion = async (req, res) => {
    const snapshot = await db.collection('question_bank');

    let filter_data = await snapshot.where('group', '==', req.query.group).get();
    let my_data = {}
    filter_data.forEach(doc => {
        my_data[doc.id] = doc.data()
    });

    let keys = Object.keys(my_data);
    let randomIndex = getRandomInt(0, keys.length);
    let key = keys[randomIndex];
    res.json(my_data[key]);
};
