const mongoose = require("mongoose")

const jobSchema =  new mongoose.Schema({
    company:{
        type:String,
        required:[true,"please provide a company name"],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,"please provide position"],
        maxlength:200
    },
    status:{
        type:String,
        enum:["interviewed","pending","declined"],
        default:"pending"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"please a user"]
    }
},{timestamps:true})
module.exports = mongoose.model("Job",jobSchema)