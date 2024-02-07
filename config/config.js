const mongoose = require('mongoose')

const db = process.env.db

mongoose.connect()

.then(()=>{
    console.log("connected to database successfully")
})

.catch( (error)=>{
    console.log("error connecting to database"+ error.message)
})
