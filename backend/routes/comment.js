const express = require("express");
const comment = express.Router();
const {comments} = require("../models");
const db = require("../models");


comment.post("/:userId/:blogId",async(req,res)=>{
    let userid = req.params.userId;
    let blogid = req.params.blogId;
    let {content} = req.body;
    try {
        await comments.create({userid:userid, blogid:blogid, content:content});
        res.json("Comment added");
    } catch (error) {
        res.json(error);
    }
})

comment.get("/",async(req,res)=>{
    try {
        let [results,metadata] = await db.sequelize.query(`select * from comments`);
        res.json(results);
    } catch (error) {
        res.json(error);
    }
})

comment.get("/:id",async(req,res)=>{
    let id = req.params.id;
    try {
        let [results,metadata] = await db.sequelize.query(`select u.name,c.id,c.content,c.createdAt from comments as c join users as u where u.id = c.userid and blogid = ${id} order by createdAt desc`);
        res.json(results);
    } catch (error) {
        res.json(error);
    }
})

comment.patch("/:id",(req,res)=>{

})

comment.delete("/:id",async(req,res)=>{
    let id = req.params.id;
    try {
        let [results,metadata] = await db.sequelize.query(`delete from comments where id = '${id}'`);
        res.json(results);
    } catch (error) {
        res.json(error);
    }
})









module.exports={comment}