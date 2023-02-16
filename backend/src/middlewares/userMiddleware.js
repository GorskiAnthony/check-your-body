const { verifyToken } = require("../services/jwt");

const userMiddleware = async (req, res, next) => {
  const token = req.cookies.cyb_user;
  const user = await verifyToken(token);

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  req.user = user;
  next();

  return null;
};

module.exports = userMiddleware;
