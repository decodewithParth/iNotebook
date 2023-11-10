const express = require('express')
var cors = require('cors')


const connectToMongo=require('./db');
connectToMongo();

const app = express()


app.use(cors())
const port = 5000

app.use(express.json())

// Available routes 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})