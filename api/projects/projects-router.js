const express = require("express");

const Projects = require("./projects-model");

const {
  nameDescriptionRequired,
  completedRequired,
} = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => res.status(200).json(!projects ? [] : projects))
    .catch(() =>
      res.status(500).json({ message: "Error retrieving projects" })
    );
});

router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (!project) {
        res.status(404).json({ message: "Project not found" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving project" });
    });
});

router.post("/", nameDescriptionRequired, (req, res) => {
  const { name, description, completed } = req.body;
  Projects.insert({ name, description, completed })
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(() => {
      res.status(500).json({ message: "Error adding project" });
    });
});

router.put("/:id", nameDescriptionRequired, completedRequired, (req, res) => {
  const { name, description, completed } = req.body;
  Projects.update(req.params.id, { name, description, completed })
    .then((project) => {
      if (!project) {
        res.status(404).json({ message: "Project not found" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Error updating project" });
    });
});

router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then((project) => {
      if (project > 0) {
        res.status(200).json({});
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Error deleting project" });
    });
});

router.get("/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      if (!actions) {
        res.status(404).json({ message: "Project not found" });
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving actions" });
    });
});

module.exports = router;
