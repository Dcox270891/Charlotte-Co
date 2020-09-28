const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport.js");
const multer = require('multer')
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

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

let upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/charlotte_co", { useNewUrlParser: true });

db.sequelize.sync({force: false})
  .then(
    app.listen(PORT, function() {
      console.log(`API Server now listening on PORT ${PORT}!`);
    })
  );
