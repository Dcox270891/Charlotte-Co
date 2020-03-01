const express = require("express");
const mongoose = require("mongoose");
const app = express();
require(`dotenv`).config();
const PORT = process.env.PORT || 3001;

const db = require("./models/sequilize");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require('./routes/sequilizeRoutes/sequilizeRoutes')(app);
require('./routes/sequilizeRoutes/sequilizeRoutes')(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/charlotte_co", { useNewUrlParser: true });

db.sequelize.sync({force:true})
  .then(() => {
    app.listen(PORT, function() {
      console.log(`API Server now listening on PORT ${PORT}!`);
    });
  });
