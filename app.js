const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const url = process.env.URL;
const port = process.env.PORT;

const auth = require('./middlewares/auth');
const middlewareLog = require('./middlewares/middleware');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');

const PostRoute = require('./routes/postRoutes')
const UserRoute = require('./routes/userRoutes')
const Login = require('./routes/login')

const app = express();

mongoose.connect(url)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));

app.use(express.json());

app.use(auth);
app.use(middlewareLog);
app.use(errorHandlingMiddleware);

app.use("/posts",PostRoute);
app.use("/user",UserRoute);
app.use("/login",Login);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});