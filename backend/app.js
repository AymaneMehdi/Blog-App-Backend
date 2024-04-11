const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


//require('dotenv').config();

//const url = process.env.URL;
//const port = process.env.PORT;

const middlewareLog = require('./middlewares/middleware');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');

const PostRoute = require('./routes/postRoutes')
const UserRoute = require('./routes/userRoutes')
const LoginRoute = require('./routes/loginRoutes')

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017')
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));

app.use(express.json());

app.use(middlewareLog);
app.use(errorHandlingMiddleware);


app.use("/posts",PostRoute);
app.use("/user",UserRoute);
app.use("/login",LoginRoute);

app.listen(8000, () => {
  console.log(`Server is running on port 7000`);
});