const express = require("express");
const blog = express.Router();
const {blogs} = require("../models");
const db = require("../models");
const {auth} = require("../middleware/authenticate");

blog.post("/:userId",auth,async(req,res)=>{
  let userId = req.params.userId;
  let{title,content} = req.body;
   try {
    await blogs.create({userid:`${userId}`, title:`${title}` ,content:`${content}`});
    res.json("Post Created");
   } catch (error) {
    res.json(error);
   }
})

blog.get("/",auth,async(req,res)=>{
   try {
    let [results,metadata] = await db.sequelize.query(`select u.name,b.title,b.id,b.content,b.createdAt from blogs as b join users as u where b.userid = u.id`);
    res.json(results);
   } catch (error) {
    res.json(error);
   }
})

blog.get("/:id",auth,async(req,res)=>{
   let id = req.params.id;
   try {
    let [results,metadata] = await db.sequelize.query(`select * from blogs where userid = "${id}"`);
    res.json(results);
   } catch (error) {
    res.json(error);
   }
})

blog.patch("/:id",async(req,res)=>{
    let id = req.params.id;
    let {title,content} = req.body;
    try {
        await db.sequelize.query(`update blogs set title = ${title}, content = ${content} where id = "${id}"`)
        res.json("Post Updated");
    } catch (error) {
        res.json(error);
    }
})

blog.delete("/:id",auth,async(req,res)=>{
    let id = req.params.id;
   try {
    let [results,metadata] = await db.sequelize.query(`delete from blogs where id = "${id}"`);
    let [results1,metadata1] = await db.sequelize.query(`delete from comments where blogid = "${id}"`);
    res.json("Post Deleted");
   } catch (error) {
    res.json(error);
   }
})



module.exports={blog}