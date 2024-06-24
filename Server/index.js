const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const fileUpload = require("express-fileupload");
const cloudinaryConnect = require("./config/cloudinaryConnect");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");

require("dotenv").config({ path: "./config/config.env" });

const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "PUT", "DELETE", "POST"],
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// dbConnect
dbConnect();
cloudinaryConnect();

// routes here
app.use("/api/v1", userRoute);
app.use("/api/v1", taskRoute);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: `successfull`,
  });
});

app.listen(PORT, () => {
  console.log(`app is listening at ${PORT}`);
});
