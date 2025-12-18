let activities = [];

const getActivities = (req, res) => {
  res.json(activities);
};

const createActivity = (req, res) => {
  activities.push(req.body);
  res.json({ message: "Activity created" });
};

const joinActivity = (req, res) => {
  res.json({ message: "Joined activity" });
};

module.exports = {
  getActivities,
  createActivity,
  joinActivity
};
