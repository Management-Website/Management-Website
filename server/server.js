const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());

const PORT = 8080;


const uri = `mongodb+srv://${process.env.Mongo_USER}:${process.env.MONGO_PASSWORD}@cluster0.w4eb3k0.mongodb.net/todo?retryWrites=true&w=majority`;


mongoose.connect(uri);
const conn = mongoose.connection;

conn.once("open", () => {
  console.log("Database connected successfully");
});
conn.on("error", (error) => {
  console.error("Error connecting to database:", error);
  process.exit();
});

const todoRouter = require('./Routes/todoRoute');
const userRoute = require('./Routes/userRoute');

app.use(todoRouter);
app.use(userRoute);



        app.listen(PORT, () => {
          console.log(`Starting server on port ${PORT}`);
        });