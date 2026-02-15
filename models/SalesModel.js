const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    type:{type:String, enum:["cash", "credit" ]},
    buyerName: String,
    produceName: String,
    produceType: String,
    tonnage: Number,
    amountPaid: Number,
    amountDue: Number,
    nin: String,
    location: String,
    contact: String,
    salesAgent: String,
    dueDate: String,
    dispatchDate: String,
    date: String,
    time: String,
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Sale", salesSchema);