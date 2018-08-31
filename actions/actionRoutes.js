const express = require("express");
const actionDb = require("../data/helpers/actionModel.js");
const projectDb = require("../data/helpers/projectModel.js");
const actionRouter = express.Router();

//MiddleWare
function bodyChecker(req, res, next) {
  const { project_id, description, notes, completed } = req.body;
  const projectsList = [];
  projectDb
    .get()
    .then(projects => {
      projectsList.push(projects);
    })
    .catch(error => {
      res.status(500).json({
        error,
        message:
          "unable to get projects to compare project id with existing projects"
      });
    });
  if (projectsList.length) {
    const project = projectsList.filter(project => project.id === project_id);
    if (project.length < 1) {
      res
        .status(500)
        .json({ message: `The project id of ${project_id} doesn't exist` });
    }
  }
  if (typeof notes !== "string") {
    res.status(500).json({ message: "Notes is required and most be a string" });
  }
  if (typeof description !== "string") {
    res
      .status(500)
      .json({ message: "description is required and must be a string" });
  }
  if (description.length > 128) {
    res.status(500).json({
      message: `${
        description.length
      } <<< description can not be greater than 128 characters`
    });
  }
  if (completed) {
    if (typeof completed !== "boolean") {
      res.status(500).json({
        message:
          "The completed field is not required but must be type boolean true or false"
      });
    }
  }

  req.posting = completed
    ? { project_id, description, notes, completed }
    : { project_id, description, notes };
  console.log(req.posting);
  next();
}

//Routes
actionRouter.get("/", (req, res) => {
  actionDb
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({ error, message: "Unable to obtain actions" });
    });
});

actionRouter.post("/", bodyChecker, (req, res) => {
  actionDb
    .insert(req.posting)
    .then(posted => {
      res.status(201).json(posted);
    })
    .catch(error => {
      res.status(500).json({ error, message: "Problem saving the post" });
    });
});

actionRouter.put("/:id", bodyChecker, (req, res) => {
  const { id } = req.params;
  actionDb
    .update(id, req.posting)
    .then(updated => {
      if (updated) {
        console.log(updated)
        res.status(200).json(updated);
      } else {
        res
          .status(404)
          .json({
            message: `Returned ${updated} action with id ${id} not found`
          });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error, message: `Problem saving update to post id ${id}` });
    });
});

module.exports = actionRouter;
