import express from "express";
import configViewEngine from "./config/viewEngine.";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
require("dotenv").config();
import bodyParser from "body-parser"; // Import body-parser to handle data sent from the client (JSON, URL encoded)

const app = express();
const PORT = process.env.PORT || 8083;
import corsMethod from "./config/cors"; // CORS configuration to allow cross-domain communication

corsMethod(app); // Apply CORS configuration to the app

configViewEngine(app);

app.use(bodyParser.json()); //Middleware to convert JSON from request into JS object on the server
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to convert URL encoded data into JS object on the server

initWebRoutes(app); // Code in Server-Side Rendering
initApiRoutes(app); // Code in Client-Side Rendering (RESTful API Standards)

app.listen(PORT, () => {
  console.log(
    ">>The callback function will be executed after this app runs successfully . port = " +
      PORT
  );
});
