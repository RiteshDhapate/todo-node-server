const express= require("express");
const cors= require("cors")
const mongoose = require("mongoose");
const app =express();
const route =require("./routes/routes")
const dbConnection =async()=>{
    try {
        await mongoose.connect("mongodb+srv://rieshdhapatepatil:todoapp@cluster0.vcti2an.mongodb.net/?retryWrites=true&w=majority");
        console.log("db connected");
    } catch (error) {
        console.log("db connection error :",error);
    }
}
dbConnection();
app.use(express.json());
app.use(cors({
    origin:"https://todo-node-server-ozyn0vd5m-riteshdhapates-projects.vercel.app"
}));
app.use("/",route);
const PORT = process.env.PORT || 2000
app.listen(PORT,()=>console.log("server is running 2000 port"))
