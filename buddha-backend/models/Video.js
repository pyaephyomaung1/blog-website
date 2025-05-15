const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title : { type : String , required : true},
    monk : { type : mongoose.Schema.Types.ObjectId , ref : "Monk" , required : true},
    videoUrl : { type : String, required : true }
});

module.exports = mongoose.model("Video" , videoSchema);