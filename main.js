// practice POST method
//load libraries & config port
const express = require('express')
const PORT = parseInt(process.argv[2] || parseInt(process.env.PORT)) || 3000

//start instance of appn
const app = express()


//configure routes
app.use(express.static(__dirname + '/static'))

app.post("/register", (req, resp) => { 
    /* '/' means start from the root
    no "/" means relative to my page
    relative and absolute addressing */
})


//start server
app.listen(PORT, () =>
    console.info(`Application started on port ${PORT} at ${new Date()}`)
)
