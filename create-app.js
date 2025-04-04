import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import sameUrlRouter from "./routes/sameurl.js";
import cors from "cors";
import { getMongoDBConnection } from "./connections/mongo-db.js";
dotenv.config();
const createApp = async () => {
  const app = express();
  app.use(cors());

  // Set EJS as the template engine
  app.set("view engine", "ejs");

  // Serve static files from the 'public' directory
  app.use(express.static("public"));

  // Database connection
  await getMongoDBConnection();

  // Middlewares
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(
    morgan(
      "\n__________________________________________\n :method :url :status :response-time ms - :remote-addr :total-time[digits] :user-agent \n__________________________________________\n"
    )
  );

  // Routes
  app.use("/", sameUrlRouter);

  app.listen(process.env.PORT || 7211, () => {
    console.info("Server is running on port : ", process.env.PORT || 7211);
  });
  return app;
};

export default createApp;
