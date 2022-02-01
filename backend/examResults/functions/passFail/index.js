exports.passFail = async (req, res) => {
    let body = req.body;
    for (let exam of body) {
        exam.passed = false;
        if(exam.grade * 100.0 >= 50) {
            exam.passed = true
        }
    }

    res.json(body);
};
