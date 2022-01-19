const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");

const app = express();
dotenv.config();
app.use(express.json());

// app.listen(3030, (e) => console.log(`Server is running on 3030`));
///mongoose connection
mongoose
  .connect("mongodb://localhost:27017/todoApp", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log(`Data base connected`))
  .catch((err) => console.log(err));

//route initialization
app.use("/todo", todoHandler);
app.use("/user", userHandler);
// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(3030, () => {
  console.log("app listening at port 3030");
});
