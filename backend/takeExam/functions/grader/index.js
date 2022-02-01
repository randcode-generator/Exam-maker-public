
exports.grader = async (req, res) => {
    console.log(req.body);
    let examsubmitted = req.body;
    let total = 0;
    let correct = 0;
    for (let question of examsubmitted.questions) {
        total += 1;
        if(question.answer == "answer1") {
            correct += 1;
        }
    }
    req.body.grade = correct/total;
    console.log(req.body);
    res.json(req.body);
};
