const activityvalidationmiddleware = (req, res, next) => {
  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: "Invalid activity data" });
  }

  next();
};

module.exports = activityvalidationmiddleware;
