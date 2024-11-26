require('dotenv').config();
var express = require('express');
const cookieParser = require("cookie-parser");
const connectDb = require('./config/db'); 
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');




var app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);



app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
    connectDb(); 
});
                 