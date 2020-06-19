const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport.js");
const app = express();
const catgeory = require("./routes/mongooseRoutes/category");
const subCatgeory = require("./routes/mongooseRoutes/subCategory");
const products = require("./routes/mongooseRoutes/products");
const uniqueTransfers = require("./routes/mongooseRoutes/uniqueTransfers");
require(`dotenv`).config();
const PORT = process.env.PORT || 3001;
const db = require("./models/sequilize");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({secret: process.env.sessionSecret, resave: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(catgeory);
app.use(subCatgeory);
app.use(products);
app.use(uniqueTransfers);

require('./routes/sequilizeRoutes/users')(app);
require('./routes/sequilizeRoutes/baskets')(app);
require('./routes/sequilizeRoutes/basketRows')(app);
require('./routes/passportRoutes/passportRoutes')(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/charlotte_co", { useNewUrlParser: true });

db.sequelize.sync({force: false})
  .then(
    app.listen(PORT, function() {
      console.log(`API Server now listening on PORT ${PORT}!`);
    })
  );
