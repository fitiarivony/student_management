let {Course} = require('../model/schemas');

function getAll(req, res) {
    Course.find().then((classes) => {
        res.send(classes);
    }).catch((err) => {
        res.send(err);
    });
}


function create(req, res) {
    let course = new Course();
    course.name = req.body.name;
    course.code = req.body.code;

    course.save()
        .then((course) => {
                res.json({message: `course saved with id ${course.id}!`});
            }
        ).catch((err) => {
        res.send('cant post course ', err);
    });
}

function remove(req, res) {
    const courseId = req.params.id;
  
    Course.findByIdAndDelete(courseId)
      .then((deletedCourse) => {
        if (!deletedCourse) {
          return res.status(404).json({ message: 'Course not found!' });
        }
        res.json({ message: `Course with id ${courseId} deleted!` });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
}

module.exports = {getAll, create, remove};
