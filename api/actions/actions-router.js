const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();

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

module.exports = router;
/*

Actions
Field	Data Type	Metadata
id	number	do not provide it when creating actions, the database will generate it
project_id	number	required, must be the id of an existing project
description	string	required, up to 128 characters long
notes	string	required, no size limit. Used to record additional notes or requirements to complete the action
completed	boolean	not required, defaults to false when creating actions


Inside api/actions/actions-router.js build endpoints for performing CRUD operations on actions:

 [POST] /api/actions
Returns the newly created action as the body of the response.
If the request body is missing any of the required fields it responds with a status code 400.
When adding an action make sure the project_id provided belongs to an existing project.
 [PUT] /api/actions/:id
Returns the updated action as the body of the response.
If there is no action with the given id it responds with a status code 404.
If the request body is missing any of the required fields it responds with a status code 400.
 [DELETE] /api/actions/:id
Returns no response body.
If there is no action with the given id it responds with a status code 404.

*/
