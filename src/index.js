// Packages
require('dotenv').config()
const express = require(`express`)
const methodOverride = require(`method-override`)
const bodyparser = require(`body-parser`)
const app = express()
const cookies = require(`cookies`)
const middelware = require(`./modules/middleware`)
const mongoose = require('./modules/database')

//Route importing
const mainRoutes = require('./views/routes/routes')
const authRoutes = require(`./views/routes/authRoutes`)
const apiRoutes = require(`./views/api/routes`)

// App Options etc
app.set("json spaces", 1)
app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")
app.use(bodyparser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(cookies.express('a','b','c'))
app.use(express.static(`${__dirname}/assets`));
app.use(express.urlencoded({ extended: true }))


// Routes

app.use("/", middelware.updateUser, mainRoutes, authRoutes)
app.use("/api", apiRoutes)
app.all("*", (req, res) => res.render("errors/404"))


// lisening to the app
app.listen(process.env.port, () => {
     console.log(`App online, http://localhost:${process.env.port}`)
})
mongoose.login()