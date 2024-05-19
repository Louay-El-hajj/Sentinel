const mongoose = require("mongoose");

const tempsHistorySchema = mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.workerId,
        ref: "worker",
    },
    temperature: {
        type: Number,
        required: "peak is required",
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const tempsHistory = mongoose.model("tempsHistory", tempsHistorySchema);

module.exports = tempsHistory;
