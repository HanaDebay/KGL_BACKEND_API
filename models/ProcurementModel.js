const mongoose = require('mongoose');

const procurementSchema = new mongoose.Schema({
    produectName: String,
    produceType: String,
    date: String,
    time: String,
    tonnage: Number,
    cost: Number,
    dealerName: String,
    branch:{type: String, enum:["Maganjo", "Matugga"]},
    contact: String,
    sellingPrice: Number

});

module.exports = mongoose.model('Procurement', procurementSchema);
