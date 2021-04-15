const mongoose = require('mongoose')

const facilitySchema = mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    quantity: { type: String, default: '0' }

}, { timestamps: true })

const Facility = mongoose.model("Facility", facilitySchema);

module.exports = Facility;