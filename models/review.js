

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewShema = new Schema({
    comment:String,
    rating:{
        type:Number,
        min :1,
        max:5,
        required : true
    },
    creatAt:{
        type:Date,
        default:Date.now()
    },
    authore:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
})

module.exports = mongoose.model("Review",ReviewShema);