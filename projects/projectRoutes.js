const express = require("express");
const projectDb = require("../data/helpers/projectModel.js");
const projectRouter = express.Router();

//MiddleWare

function bodyChecker(req, res, next) {
  const { name, description, completed } = req.body;
  if (name.length > 128) {
    res.status(500).json({
      message: `${
        name.length
      } <<name is too long needs to be less than or equal to 128 characters`
    });
  }
  if (typeof name !== "string") {
    res.status(500).json({ message: "name must be a string" });
  }
  if (typeof description !== "string") {
    res.status(500).json({ message: "description must be a string" });
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
    ? { name, description, completed }
    : { name, description };
  next();
}

//Routes
projectRouter.get("/", (req, res) => {
  projectDb
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ error, message: "Unable to obtain projects" });
    });
});

projectRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  projectDb
    .get(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          error,
          message: `Unable to obtain project actions for id: ${id}`
        });
    });
});

projectRouter.post("/", bodyChecker, (req, res) => {
  projectDb
    .insert(req.posting)
    .then(posted => {
      res.status(201).json(req.posting);
    })
    .catch(error => {
      res.status(500).json({ error, message: "unable to save new project" });
    });
});

projectRouter.put("/:id", bodyChecker, (req, res) => {
  const { id } = req.params;
  projectDb.update(id, req.posting).then(updated => {
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: `Not found ${updated} for id: ${id}` });
    }
  });
});

projectRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  projectDb
    .remove(id)
    .then(deletedCount => {
      if (deletedCount) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: `Nothing deleted because id ${id} was not found` });
      }
    })
    .catch(error => {
      res.status(500).json({ error, message: `Issue with deleting id ${id}` });
    });
});

module.exports = projectRouter;
