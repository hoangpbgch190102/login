require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@first-project.tfkih.mongodb.net/first-project?retryWrites=true&w=majority`, 
            {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            }
        )
        console.log("mongoDB connected");
    }catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

connectDB()

const app = express()
app.use(express.json())

app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
const PORT = 5000

app.listen(PORT,()=> {
    console.log(`server listening on ${PORT}`);
})