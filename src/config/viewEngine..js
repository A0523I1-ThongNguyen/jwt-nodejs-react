import express from "express";

/**
// The configViewEngine function sets the view engine to EJS, allows serving static files from ./src/public, and searches for templates in ./src/views.
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
  app.use(express.static("./src/public")); // The app will allow access to image, CSS, and JS files in /src/public.
  app.set("view engine", "ejs"); // Define the view engine. Use EJS technology to write HTML code for Node.js.
  app.set("views", "./src/views"); // Define the location for storing the view engine files. The view engine files will be stored inside src/views.
};

export default configViewEngine; //export tham chiếu configViewEngine
