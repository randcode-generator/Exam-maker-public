exports.filterExamTaken = async (req, res) => {
    let allExam = req.body.allExam.body;
    console.log("allExam");
    console.log(allExam)
    let examTaken = req.body.examTaken.body;
    console.log("examTaken");
    console.log(examTaken)
    let f = allExam.filter(x => examTaken.findIndex(y => x.examName == y.examName) == -1);
    console.log("++++++++++")
    console.log(f);
    res.json(f);
};
