require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const savedRoutes = require("./routes/saved");
const configurePassport = require("./config/passport");
const app = express();
const PORT = process.env.PORT || 4000;

app.set("trust proxy", 1);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo connected"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);
app.use("/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/saved", savedRoutes);
app.get("/", (req, res) => res.json({ ok: true }));
app.get("/debug", (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated && req.isAuthenticated(),
    user: req.user || null,
    sessionID: req.sessionID,
  });
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
  });
}
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));