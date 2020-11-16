// const http = require("http");
// const routers = require('./routers')
// const server = http.createServer(routers);
// server.listen(3000);

const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const notFound = require("./controller/404");
const db = require("./util/database");
const app = express();

// const expressHbs = require("express-handlebars");

// app.engine(
//   "hbs",
//   expressHbs({
//     layoutsDir: "views/layouts",
//     extname: "hbs",
//     defaultLayout: "main-layout",
//   })
// );

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(notFound.notFound);

app.listen(3000);
