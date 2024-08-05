const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// variables yet to be hidden in env files
const PORT = 8080
const SECRET_API_PATH = "/v1/hehehe"

// fetching the blue print
// const usersRoute = require('./Routes/users')
// const formsRoute = require('./Routes/forms')

// app.use(SECRET_API_PATH+"/users",usersRoute)
// app.use(SECRET_API_PATH+"/forms",formsRoute)

app.get("/",(req,res)=>{
    res.send("hola")
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})