// practice POST method
//load libraries & config port
const express = require('express')
const handlebars = require('express-handlebars')
const PORT = parseInt(process.argv[2] || parseInt(process.env.PORT)) || 3000

//start instance of appn
const app = express()

app.engine('hbs', handlebars({defaultLayout: 'default.hbs'}))
app.set('view engine', 'hbs')

//configure express to parse POST application/x-www-form-urlencoded & appn/json
// **app.use(express.urlencoded({extended: true}))
//above code reads incoming form data & extended: true uses qs library to convert objs and arrs into urlencoded format like json obj.
//form data is in req.body (body attribute is created by urlencoded)

//app.use(express.json()) 
//above code's action: any json payload coming in will get parsed and converted into req.body

//configure routes
app.use(express.static(__dirname + '/static'))

/* '/' in resource "/register" means start from the root
    no "/" means relative to my page
    relative and absolute addressing */
app.post("/register", 
    express.urlencoded({extended: true}),
    express.json(),
    //examine the req and chain handlers in 1 single function
    //works since express returns middleware fn
    (req, resp, next) => {
        const name = req.body.name.toLowerCase().trim();
        if (name == 'fred') {
            return next()
        }
        resp.status(403)
        resp.type('text/html')
        resp.end(`<h1>You shall not pass</h1>`)
    },
    (req, resp) => { 
    console.info('body:', req.body)
    const body = req.body
    resp.status(201) //GET uses 200, but POST uses 201 created or 202 accepted(but not processed eg submit application to HDB)
    //resp.end() //use .end() when u are not returning anything to close connection

    /*  const applicant = req.body
    resp.send(`Thank you ${applicant.name}. We note your choice of ${applicant.vegetarian} to vegetarian meal.\
    Thank you for your submission and hope to see you on ${applicant['available-date']}.`)
 */
    resp.type('text/html')
    resp.render("thankyou", {
        name: body.name,
        available: body['available-date']
    })
})


/* app.get('/time', (req, resp) => {
    resp.status(200)
    resp.type('text/html')
    resp.end(`<h1>The current time is <code>${new Date()}</code></h1>`)
})
if u put a app.get after post and app.use() for POSTs, app.use will capture and process it
so 1 way to do is put the app.get above the POST-related handlers.
or put the handlers into app.POST since it is the only one using the handlers
 */
//start server
app.listen(PORT, () =>
    console.info(`Application started on port ${PORT} at ${new Date()}`)
)
