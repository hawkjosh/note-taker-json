const express = require('express')
const path = require('path')
const api = require('./routes/index.js')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use('/api', api)
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/notes', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () =>
	console.log(`Server running at http://localhost:${PORT}`)
)
