require('dotenv').config()
const express = require('express')
const cors = require('cors')
const solutionsRouter = require('./routes/solutions.route')
const app = express()


const PORT = process.env.PORT || 5000

app.use(express.json())
// app.use(cors({credentials: true, origin: process.env.CLIENT_URL}))
app.use('/api/solution', solutionsRouter)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))