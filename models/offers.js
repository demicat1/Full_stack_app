const mongoose = require("mongoose");
const mongoosePag = require('mongoose-paginate-v2');

const OfferSchema = new mongoose.Schema({
    id:String,
    title: String,
    name_of_comp: String,
    details: String,
    sphere: String,
    privateness: String,
    city: String,
    salary: String,
    accepted:Boolean,
})
OfferSchema.plugin(mongoosePag);
const JobOffer = mongoose.model("offers", OfferSchema);

module.exports = JobOffer