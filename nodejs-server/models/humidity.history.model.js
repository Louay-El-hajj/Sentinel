const mongoose = require("mongoose");

//Creating a schema for solar history collection
const humidityHistorySchema = mongoose.Schema({
    worker_id: {
        type: String,
        required: "worker_id is required",
    },
    humidity: {
        type: Number,
        required: "humidity is required",
    },
    timestamp: {
        type: Date,
        required: "time is required",
        default: Date.now,
    },
});

//Creating solar history model using schema
const  humidityHistory = mongoose.model(" humidityHistory",  humidityHistorySchema);

module.exports =  humidityHistory;
