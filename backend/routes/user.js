const express = require("express");
const user = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models");
const {users} = require("../models");

user.post("/signup",async(req,res)=>{
    let payload = req.body;
    let {name,email,password} = payload;
    try {
        const [results, metadata] = await db.sequelize.query(`select * from users where email = "${email}"`);
        if (results.length==0){
            try {
                bcrypt.hash(password,Number(process.env.salt),async(err,hash)=>{
                    if (hash){
                        await users.create({name:`${name}`, email:`${email}`, password:`${hash}` });
                        res.json("User Created") 
                    }
                    else {
                        res.json("Error hashing Password");
                    }
                })
                
            } catch (error) {
                res.json(error);
            }
        }
        else {
            res.json("User Already Exists !");
        }
    } catch (error) {
        res.json(error);
    }
    
    
})


user.post("/login",async(req,res)=>{
    let {email,password} = req.body;

    try {
        let [results,metadata] = await db.sequelize.query(`select * from users where email = "${email}"`)
        console.log(results)
        if (results.length == 0){
            res.json("User Not Found");
        }
        else {
            bcrypt.compare(password,results[0].password,(err,result)=>{
                if (result){
                    res.json({msg:"Login Succesfull",id:results[0].id});
                }
                else {
                    res.json("Wrong Password");
                }
            })
        }
    } catch (error) {
        res.json(error);
    }
})




user.get("/",async(req,res)=>{
    try {
        const [results, metadata] = await db.sequelize.query(`select * from users`);
        res.json(results);
    } catch (error) {
        res.json(error);
    }
})

user.get("/:id",async(req,res)=>{
    let id = req.params.id
    try {
        const [results, metadata] = await db.sequelize.query(`select * from users where id = "${id}"`);
        res.json(results);
    } catch (error) {
        res.json(error);
    }
})

user.patch("/:id",(req,res)=>{
    
})

user.delete("/:id",async(req,res)=>{
    let id = req.params.id
    try {
        const [results, metadata] = await db.sequelize.query(`delete from users where id = "${id}"`);
        res.json("User Deleted");
    } catch (error) {
        res.json(error);
    }
})









module.exports={user}