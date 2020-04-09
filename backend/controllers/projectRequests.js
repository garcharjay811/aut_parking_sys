const ProjectRequest = require("../models/projectRequest");

exports.createProjectRequest = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  // const ProjectRequest = new ProjectRequest({
  //   title: req.body.title,
  //   content: req.body.content,
  //   imagePath: url + "/images/" + req.file.filename,
  //   creator: req.userData.userId
  // });
  ProjectRequest.create({
    title: req.body.title,
    description: req.body.description,
    image: url + "/images/" + req.file.filename,
    deadline: req.body.deadline,
    cost_capping: req.body.cost_capping,
    customer_id: req.userData.userId
  }).then(createdProjectRequest => {
      res.status(201).json({
        message: "ProjectRequest added successfully",
        ProjectRequest: createdProjectRequest
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a ProjectRequest failed!"
      });
    });
};

exports.updateProjectRequest = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const projectRequestData = {
    title: req.body.title,
    description: req.body.description,
    image: imagePath,
    deadline: req.body.deadline,
    cost_capping: req.body.cost_capping
  };
  // ProjectRequest.updateOne({ _id: req.params.id, creator: req.userData.userId }, ProjectRequest)
  ProjectRequest.update( projectRequestData, { where: { id: req.params.id, customer_id: req.userData.userId } })
    .then(result => {
      console.log("result", result)
      if (result[0] > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate ProjectRequest!"
      });
    });
};

exports.getProjectRequests = (req, res, next) => {
  ProjectRequest.findAll()
  .then(requests => {
      res.status(200).json({
        message: "ProjectRequests fetched successfully!",
        ProjectRequests: requests,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching ProjectRequests failed!"
      });
    });
};

exports.getProjectRequest = (req, res, next) => {
  ProjectRequest.findOne({ where: {id: req.params.id} })
    .then(ProjectRequest => {
      if (ProjectRequest) {
        res.status(200).json(ProjectRequest);
      } else {
        res.status(404).json({ message: "ProjectRequest not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching ProjectRequest failed!"
      });
    });
};

exports.getProjectRequestByUserId = (req, res, next) => {
  // console.log(req)
  ProjectRequest.findAll({ where: {customer_id: req.userData.userId} })
    .then(ProjectRequest => {
      if (ProjectRequest) {
        res.status(200).json(ProjectRequest);
      } else {
        res.status(404).json({ message: "ProjectRequest not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching ProjectRequest failed!"
      });
    });
};

// exports.deleteProjectRequest = (req, res, next) => {
//   ProjectRequest.deleteOne({ id: req.params.id, customer_id: req.userData.customer_id })
//     .then(result => {
//       console.log(result);
//       if (result.n > 0) {
//         res.status(200).json({ message: "Deletion successful!" });
//       } else {
//         res.status(401).json({ message: "Not authorized!" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Deleting ProjectRequests failed!"
//       });
//     });
// };
