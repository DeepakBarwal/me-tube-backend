import express from "express";
const app = express();

import serverConfig from "./config/serverConfig.js";
const { PORT } = serverConfig;

app.listen(PORT, () => {
  console.log("Server is listening on PORT " + PORT);
});
