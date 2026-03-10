import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import apiRouter from "./src/routes";
import connectionDB from "./src/connection/connection";

const app:Express = express();
const port: number = 3000;

app.use(morgan("dev"));
app.use(express.json())
app.use(express.static("public"));
app.use(apiRouter);

connectionDB();

app.listen(port, () => (
  console.log(`Example app listening on port ${port}`)
))
