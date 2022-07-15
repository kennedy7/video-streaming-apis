const express = require ('express')
const app = express()
const port =  process.env.PORT  || 3002
const router = require('./route')


app.listen(port, ()=>{
    console.log(`App started on port >>${port}`)
})

app.use(router)
