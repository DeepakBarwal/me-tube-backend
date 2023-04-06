import express from "express";
const app = express();

import { PORT } from "./config/serverConfig.js";
import { connect } from "./config/database.js";
import apiRoutes from "./routes/index.js";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  return res.status(500).json({
    success: false,
    data: {},
    message: err.message || "Something went wrong",
    err,
  });
});

app.listen(PORT, async () => {
  console.log("Server is listening on PORT " + PORT);
  await connect();
});
