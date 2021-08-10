import "reflect-metadata";
import express, { Request, Response } from "express";
import "./database";

const app = express();

app.use(express.json());

app.get("/", (request: Request, response: Response) =>
  response.json({ "Api Status": "Online 🖖", "Api version": "0.0.1" })
);

app.listen(3333, () => {
  console.log("Our app is running on port");
});
