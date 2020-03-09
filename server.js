const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cloudinary = require('cloudinary').v2;
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
app.use(session({secret: process.env.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(catgeory);
app.use(subCatgeory);
app.use(products);
app.use(uniqueTransfers);
cloudinary.config({ 
  cloud_name: process.env.cloudName, 
  api_key: process.env.clodinaryKey, 
  api_secret: process.env.coudinarySecret,
});

require('./routes/sequilizeRoutes/sequilizeRoutes')(app);
require('./routes/passportRoutes/passportRoutes')(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/charlotte_co", { useNewUrlParser: true });

db.sequelize.sync({force: false})
  .then(
    app.listen(PORT, function() {
      console.log(`API Server now listening on PORT ${PORT}!`);
    })
  );
