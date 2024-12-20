import express from "express";
import configViewEngine from "./config/viewEngine.";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
require("dotenv").config();
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8083;
import corsMethod from "./config/cors";

corsMethod(app);

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log(
    ">>The callback function will be executed after our app runs successfully . port = " +
      PORT
  );
});
