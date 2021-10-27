const express = require("express");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error")

const app = express();
app.use(express.json());

app.use("/api/places", placesRoutes); // => /api/places...
app.use("/api/users", usersRoutes); // => /api/users...

app.use((req, res, next) => {
  const error = new HttpError("Could Not Find This Route", 404);
  throw error;
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(3000);
