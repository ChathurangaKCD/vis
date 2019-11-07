import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import servicesRouter from "./servicesRouter";
import expressStaticGzip from "express-static-gzip";

const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", [servicesRouter]);
app.use("/", expressStaticGzip("../build/", {}));

app.use("*", (_, res) => {
  res.status(404).send({ error: "The requested resource does not exist" });
});

export default app;
