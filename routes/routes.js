const express = require("express");
const route = express.Router();
const {user,todo}=require("../models/index");
route.get("/",(req,res)=>{
    try {
        res.send(`server home route ${req.ip}`);
    } catch (error) {
        res.send("home route error");
        console.log("home route error :",error);
    }
})
route.post("/alltodo",async(req,res)=>{
    try {
        const {userid}= req.body;
        const result= await todo.find({userid});
        res.send(result)
        // console.log(result);
    } catch (error) {
        res.status(400).json({massage:"geting to do error"});
        console.log("alltodo route error",error);
    }
})
route.post("/user",async(req,res)=>{
    try {
        const {email,password}= req.body;
        // console.log(req.body);
        const result= await user.find({email,password});
        console.log(email, result);
        res.json(result)
    } catch (error) {
        res.status(400).json({massage:"geting user info error"});
        console.log("user route error",error);
    }
})
route.post('/addtodo',async(req,res)=>{
    try {
        const {title,massage,completed,userid}= req.body;
       await todo.create({title,massage,completed,userid});
        console.log(title,massage,completed,userid);
        res.send(`${title} ${massage} ${userid}`);
    } catch (error) {
        res.status(400).json({massage:"todo creation error"});
        console.log("todo creation error :",error);
    }
})


route.post('/adduser',async(req,res)=>{
    try {
        const {username,email,password}= req.body;
        console.log(username,email,password);
        await user.create({username,email,password})
        res.send(`${username} ${email} ${password}`);
        
    } catch (error) {
         res.status(400).json({massage:"user creation error"});
        console.log("user creation error :",error);
    }
})
route.put("/updatetodo",async(req,res)=>{
    try {
        const {title,massage,todoid}= req.body;
        console.log(title,massage,todoid);
        const updatedTodo= await todo.updateOne({_id:todoid},{$set:{title,massage}});
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({massage:"todo updation error"});
        console.log("todo updation error :",error); 
    }
})

route.put("/updatetodocompleted",async(req,res)=>{
    try {
        const { completed ,todoid}= req.body;
        const updatedTodo= await todo.updateOne({_id:todoid},{$set:{completed}});
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({massage:"todo completion set error"});
        console.log("todo completion set error :",error); 
    }
})

route.delete("/deletetodo",async(req,res)=>{
    try {
        const {todoid}= req.body;
        console.log(todoid);
        const result= await todo.deleteOne({todoid});
        console.log(result);
        res.send("todo deleted");
    } catch (error) {
        res.status(400).json({massage:"todo deletion error"});
        console.log("todo deletion error :",error);
    }
})
module.exports= route;