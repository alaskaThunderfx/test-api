const express = require(`express`)
const app = express()
const mongoose = require(`mongoose`)
const bodyParser = require(`body-parser`)
// const port = 'http://localhost:4741'
// const port2 = `https://api.hatchways.io/assessment/blog/posts`

app.use(bodyParser.json())

// Import routes
const pingRoute = require(`./routes/ping`)
const postsRoute = require(`./routes/posts`)

app.use(`/api/ping`, pingRoute)
app.use(`/api/posts`, postsRoute)

app.get(`/`, (req, res) => {
    try {
        res.sendStatus(200)
    } catch {
        res.sendStatus(404)
    }
})

app.listen(4741, () => console.log(`app is listening on port 4741`))