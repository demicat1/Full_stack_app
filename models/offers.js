const mongoose = require("mongoose");


const OfferSchema = new mongoose.Schema({
    title: String,
    name_of_comp: String,
    details: String,
    sphere: String,
    privateness: String,
    city: String,
    salary: String,
    images: [Object],
})

const JobOffer = mongoose.model("offers", OfferSchema);

module.exports = JobOffer