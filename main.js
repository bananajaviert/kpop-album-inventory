import express from 'express'
import path from 'path'
import url from 'url'
import exphbs from 'express-handlebars'
// Data
import { albums as izonealbums } from './backend/data/izone.js'
import { albums as loonaalbums } from './backend/data/loona.js'
// Routes
import { router as izonerouter } from './backend/routes/groups/izoneroute.js'
import { router as loonarouter } from './backend/routes/groups/loonaroute.js'


const app = express()

// Access directories and files
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 8080

//  Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view-engine', 'handlebars')

// Set static folder
app.use(express.static('public'))

const albums = 'Albums'
// API routes
app.use('/groups/izone', izonerouter)
app.use('/groups/loona', loonarouter)

// console.log(__dirname)
app.listen(PORT)

export { albums }