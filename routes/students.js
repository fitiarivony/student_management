let { Student } = require("../model/schemas");

function getAll(req, res) {
  Student.find()
    .then((students) => {
      res.send(students);
    })
    .catch((err) => {
      res.send(err);
    });
}
async function deleteEtudiant(req, res) {
  try {
   
    const deletedStudent = await Student.findByIdAndDelete(req.body.id);
    console.log(deletedStudent);
    
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({
      message: "Student deleted successfully",
      studentId: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
}

function create(req, res) {
  let student = new Student();
  student.firstName = req.body.firstName;
  student.lastName = req.body.lastName;

  student
    .save()
    .then((student) => {
      res.json({ message: `student saved with id ${student.id}!` });
    })
    .catch((err) => {
      res.send("cant post student ", err);
    });
}

module.exports = { getAll, create,deleteEtudiant };
