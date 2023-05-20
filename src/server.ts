import { router } from "./routers/movies";
import express from "express";

const port = 3001;

const app = express();

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(
    `Successfully listening on port ${port} at ${new Date().getTime()}`
  );
});
