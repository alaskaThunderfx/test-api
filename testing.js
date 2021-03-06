const express = require(`express`)
const app = express()
const mongoose = require(`mongoose`)
const bodyParser = require(`body-parser`)
require(`dotenv/config`)

app.use(bodyParser.json())

// Import routes
const pingRoute = require(`./routes/ping`)
const postsRoute = require(`./routes/posts`)

// Set routes
app.use(`/api/ping`, pingRoute)
app.use(`/api/posts`, postsRoute)

// Router
app.get(`/`, (req, res) => {
    try {
        res.sendStatus(200)
    } catch {
        res.sendStatus(404)
    }
})

// Connect to local DB for testing
mongoose.connect(process.env.DB_URI, () => {
    console.log(`connected to the DB!`)
})

app.listen(4741, () => console.log(`app is listening on port 4741`))