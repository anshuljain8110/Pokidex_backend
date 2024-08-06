const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./models/dbconnect');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// variables yet to be hidden in env files
const PORT = 8080
const SECRET_API_PATH = "/v1/hehehe"
connectDB();

// fetching the blue print
const usersRoute = require('./routes/main')
// const formsRoute = require('./Routes/forms')

app.use(SECRET_API_PATH,usersRoute)
// app.use(SECRET_API_PATH+"/forms",formsRoute)



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})