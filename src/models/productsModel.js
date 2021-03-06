const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
	vehicleName: String,
	vehicleImgURL: String,
	RentalPrice: Number,
    Count: Number,
    status: {
        type:String,
        enum : ['Available','NotAvailable']
    }
})

module.exports = model("Products", ProductSchema);