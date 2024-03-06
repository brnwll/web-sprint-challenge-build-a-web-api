// add middlewares here related to projects
function requiredFields(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: "Name and description are required" });
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
