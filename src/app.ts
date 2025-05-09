import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
