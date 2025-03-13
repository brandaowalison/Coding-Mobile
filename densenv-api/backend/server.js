const express = require("express")
const connectDB = require('./src/db/mongoose')
const filmesRouter = require('./src/routes/filme.routes')

const app = express()
const port = 3000

app.use(express.json())


connectDB()


app.use('/api/filme', filmesRouter)

app.listen(port,() => {
    console.log(`Server in running on http://localhost:${port}`)
})

