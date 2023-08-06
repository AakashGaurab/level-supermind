const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
require("dotenv").config();


app.use(express.json());
app.use(cors({"origin":"*"}));


const {user} = require("./routes/user");
const {blog} = require("./routes/blog");
const {comment} = require("./routes/comment");



app.get("/",(req,res)=>{
    res.send(`<h1>HEY Welcome to backend side of blog application</h1>`)
})

app.use("/user",user);
app.use("/blogs",blog)
app.use("/comment",comment)





app.listen(process.env.port,async()=>{
    try {
        await db.sequelize.sync();
        console.log(`Server running at http://localhost:${process.env.port}`)
    } catch (error) {
       console.log(error);        
    }
})