const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();
const { requiredFields, completedRequired } = require("./actions-middleware");

router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(!actions ? [] : actions);
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving actions" });
    });
});

router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (!action) {
        res.status(404).json({ message: "Action not found" });
      } else {
        res.status(200).json(action);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Error retrieving action" });
    });
});

router.post("/", requiredFields, (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  Actions.insert({ project_id, description, notes, completed })
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch(() => {
      res.status(500).json({ message: "Error adding action" });
    });
});

router.put("/:id", requiredFields, completedRequired, (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  Actions.update(req.params.id, { project_id, description, notes, completed })
    .then((action) => {
      if (!action) {
        res.status(404).json({ message: "Action not found" });
      } else {
        res.status(200).json(action);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Error updating action" });
    });
});

router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json();
    })
    .catch(() => {
      res.status(500).json({ message: "Error deleting action" });
    });
});

module.exports = router;
