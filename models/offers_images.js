const mongoose = require('mongoose')

const OfferImgSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    images: [Object],
})

const OfferImg = mongoose.model("offers_images",OfferImgSchema);

module.exports = OfferImg;