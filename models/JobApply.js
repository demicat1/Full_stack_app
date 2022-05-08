const mongoose = require('mongoose');
const JobApplySchema = new mongoose.Schema({
    title:String, name:String, details:String, sphere:String, type:String, city:String, salary:String,
    }
)
const JobApply = mongoose.model("joblists", JobApplySchema);


module.exports=JobApply;