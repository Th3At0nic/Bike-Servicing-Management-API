import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";

const app: Application = express();

// parsers
app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
