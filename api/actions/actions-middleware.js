// add middlewares here related to actions
function requiredFields(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res
      .status(400)
      .json({ message: "Project id, description, and notes are required" });
  } else {
    next();
  }
}

function completedRequired(req, res, next) {
  const { completed } = req.body;
  if (completed === undefined) {
    res.status(400).json({ message: "Completed is required" });
  } else {
    next();
  }
}

module.exports = { requiredFields, completedRequired };
