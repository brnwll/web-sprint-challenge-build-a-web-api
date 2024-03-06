const express = require("express");

const Projects = require("./projects-model");

const {
  nameDescriptionRequired,
  completedRequired,
} = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => res.status(200).json(!projects ? [] : projects))
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (!project) {
        res.status(404).json({ message: "Project not found" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(next);
});

router.post("/", nameDescriptionRequired, (req, res, next) => {
  const { name, description, completed } = req.body;
  Projects.insert({ name, description, completed })
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put(
  "/:id",
  nameDescriptionRequired,
  completedRequired,
  (req, res, next) => {
    const { name, description, completed } = req.body;
    Projects.update(req.params.id, { name, description, completed })
      .then((project) => {
        if (!project) {
          res.status(404).json({ message: "Project not found" });
        } else {
          res.status(200).json(project);
        }
      })
      .catch(next);
  }
);

router.delete("/:id", (req, res, next) => {
  Projects.remove(req.params.id)
    .then((project) => {
      if (project > 0) {
        res.status(200).json({});
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch(next);
});

router.get("/:id/actions", (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      if (!actions) {
        res.status(404).json({ message: "Project not found" });
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(next);
});

module.exports = router;
