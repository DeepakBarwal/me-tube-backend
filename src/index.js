import express from "express";
const app = express();

import { PORT } from "./config/serverConfig.js";
import { connect } from "./config/database.js";

app.listen(PORT, async () => {
  console.log("Server is listening on PORT " + PORT);
  await connect();
});
