const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "../config/config.env" });

exports.auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: `user is not logged in !!!`,
    });
  }

  const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedPayload;
  
  next();
  
  

};
