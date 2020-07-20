/**
 * Created by LuxonD on 2020/4/27.
 */
const myexpress = require("express");
const myejs = require("ejs");
const mysession = require("express-session");
const logger = require("morgan");
const favicon = require('serve-favicon');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const viewRouer = require("./router/vievRouter");
const userRouter = require("./router/userRouter");
const app  = myexpress();
app.use(cookieParser());
app.use(mysession({
    secret: '12345',
    name: 'name',
    cookie: {maxAge: 36000000},
    resave: true,
    saveUninitialized: true
}));
app.use(viewRouer);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views",__dirname+"/view");
app.engine("html",myejs.__express);
app.set("view engine","html");
app.use(userRouter);
app.use(myexpress.static(__dirname+"/public"));
app.use(favicon(__dirname+"/public/img/favicon.png"));
app.listen(9575);

