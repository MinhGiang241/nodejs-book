const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const path = require("path");
const notFound = require("./controller/404");
const User = require("./models/user");
const { mongoConnect } = require("./util/database");
const mongoose = require("mongoose");

const app = express();

app.use(morgan("combined"));

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5fba112bdd40bc144c6103b2")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(notFound.notFound);

mongoose
  .connect(
    "mongodb+srv://minhgiang241:concoc221992@cluster0.wmmld.mongodb.net/book?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Max",
          email: "max@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
      app.listen(3000);
    });
  })
  .catch((err) => console.log(err));
