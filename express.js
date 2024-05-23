const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRouter = require("./router/userRouter.js")
const animales = require("./router/animalesRouter.js")
const adminRouter = require("./router/adminRouter.js")
const PORT = 8080

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use("/user", userRouter)
app.use("/", animales)
app.use("/admin", adminRouter)


app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
})