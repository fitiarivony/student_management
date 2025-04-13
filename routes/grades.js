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
async function deleteGrade(req, res) {
    try {
      const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
      
      if (!deletedGrade) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json({
        message: "Student deleted successfully",
        courseId: req.params.id,
      });
    } catch (error) {
      res.status(500).json({ message: "Error deleting course", error });
    }
  }
module.exports = {getAll, create,deleteGrade};
