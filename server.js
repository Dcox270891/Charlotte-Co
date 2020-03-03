const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport.js");
const app = express();
require(`dotenv`).config();
const PORT = process.env.PORT || 3001;
const db = require("./models/sequilize");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({secret:`cheeseisthebestnonvegansnack`}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/sequilizeRoutes/sequilizeRoutes')(app);
require('./routes/mongooseRoutes/mongooseRoutes')(app);
require('./routes/passportRoutes/passportRoutes')(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/charlotte_co", { useNewUrlParser: true });

db.sequelize.sync({force: false})
  .then(
    app.listen(PORT, function() {
      console.log(`API Server now listening on PORT ${PORT}!`);
    })
  );
