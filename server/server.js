
require('dotenv').config()

const   express = require('express'),
        path = require('path'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        compress = require('compression'),
        http = require('http')

const   Bot = require('./text-recognition-bot/bot')
const   oneYearInMs = 31536000000

class Server {

    constructor() {
		this.init()
		this.start(parseInt(process.env.PORT, 10))
    }

    init () {
        this.app = express()
        // Adding Gzip
        this.app.use(compress())
        // Adding parsers
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(cookieParser())
        // Adding static server with cache-control
        this.app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneYearInMs }))
        // Adding the Itequia bot
        this.bot = new Bot()
        // Adding error handling
        this.app.use( (req, res, next)  => res.status(404) )
    }

    start (port = 3000) {
        // Adding app port & starting server
        this.app.set('port', port)    
        const server = http.createServer(this.app).listen(port).on(
            'listening', 
            () => console.log(`Listening on ${ server.address().port || server.address() }`)
        )
    }
}

new Server()