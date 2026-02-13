const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    type:{type:String, enum:["cash", "credit" ]},
    buyerName: String,
    produceName: String,
    produceType: String,
    tonnage: Number,
    amountPaid: Number,
    nationalID: String,
    location: String,
    contacts: String,
    amountPaid: Number,
    salesAgentName: String,
    dueDate: String,
    dispatchDate: String,
    date: String,
    time: String
});

module.exports = mongoose.model("Sale", salesSchema);