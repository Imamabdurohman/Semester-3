const express = require("express");
const router = express.Router();

const {
  getActivities,
  createActivity,
  joinActivity
} = require("../controllers/activitycontroller");

router.get("/activities", getActivities);
router.post("/activities", createActivity);
router.post("/activities/:id/join", joinActivity);

module.exports = router;
