import "reflect-metadata";
import express, { Request, Response } from "express";
import "./database";
import { noteRoutes } from "./routes/notes.routes";
import { interestedRoutes } from "./routes/interested.routes";
import { itemsRoutes } from "./routes/items.routes";
import { processesRoutes } from "./routes/processes.routes";

const app = express();

app.use(express.json());

app.use("/notes", noteRoutes);
app.use("/interested", interestedRoutes);
app.use("/items", itemsRoutes);
app.use("/processes", processesRoutes);

app.get("/", (request: Request, response: Response) =>
  response.json({ "Api Status": "Online 🖖", "Api version": "0.0.1" })
);

app.listen(3333, () => {
  console.log("Our app is running on port");
});
