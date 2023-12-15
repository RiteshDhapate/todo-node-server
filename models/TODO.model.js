const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    massage:{
        type:String,
    },
    completed:{
            type:Boolean,
            default:false,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
}, { timestamps: true });

module.exports= mongoose.model("todo",todoSchema);