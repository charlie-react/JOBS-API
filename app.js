require('dotenv').config();
require('express-async-errors');

// extra security
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const rateLimit = require("express-rate-limit")

const express = require('express');
const app = express();
const connectDB = require("./db/connect")


const authenticateUser = require("./middleware/authentication")
// routes
const authRouter = require("./routes/auth")
const jobsRouter = require("./routes/jobs")

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const { x } = require('joi');

app.use(express.json());
// extra packages
app.set('trust proxy', 1)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))
app.use(helmet())
app.use(xss())
app.use(cors())



// routes

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/jobs",authenticateUser, jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
// const start = async () => {
//   try {
//    await connectDB(process.env.MONGO_URI)
//     console.log("db connected..")
//     app.listen(port, () =>
//       console.log(`Server is listening on port ${port}...`)
//     );
//   } catch (error) {
//     // console.log(error);
//     console.log("Error connecting to the database:", error.message);
//   }
// };

// start();
