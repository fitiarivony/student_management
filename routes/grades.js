let {Grade, Student, Course} = require('../model/schemas');

function getAll(req, res) {
    Grade.find()
        .populate('student')
        .populate('course')
        .then((grades) => {
            res.send(grades);
        }).catch((err) => {
        res.send(err);
    });
}


function create(req, res) {
    let grade = new Grade();

    grade.student = req.body.student;
    grade.course = req.body.course;
    grade.grade = req.body.grade;
    grade.date = req.body.date;

    grade.save()
        .then((grade) => {
                res.json({message: `grade saved with id ${grade.id}!`});
            }
        ).catch((err) => {
        console.log(err);
        res.status(400).send('cant post grade ', err.message);
    });
}

function update(req, res) {
    const id = req.params.id;
    Grade.findByIdAndUpdate(
      id,
      {
        student: req.body.student,
        course: req.body.course,
        grade: req.body.grade,
        date: req.body.date
      },
      { new: true }
    )
      .populate('student')
      .populate('course')
      .then(updatedGrade => {
        if (!updatedGrade) return res.status(404).json({ message: "Note non trouvée" });
        res.json({ message: "Note mise à jour", grade: updatedGrade });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  }  

module.exports = {getAll, create, update};
