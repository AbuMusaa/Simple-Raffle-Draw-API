const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");

const app = express();
app.use([morgan("dev"), cors(), express.json()]);

app.use("/api/v1/tickets/", routes);

app.get("/health", (_req, res) => res.status(200).json({ message: "Success" }));

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    messag: `${req.originalUrl} : This url is not found!`,
  });
});

app.use((_req, _res, next) => {
  const error = new Error("Resorce Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, _req, res, _next) => {
  if (error.status) {
    res.status(error.status).json({
      messag: error.messag,
    });
  }

  res.status(500).json({
    message: "Something went to wrong!",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port:", port);
});
