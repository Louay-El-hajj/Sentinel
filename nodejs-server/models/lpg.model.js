const mongoose = require("mongoose");

//Creating peak schema
const lpgSchema = mongoose.Schema({
    lpg: {
        type: mongoose.Schema.Types.workerId,
        required: true,
    },
    peak: {
        type: Number,
        required: "peak is required",
    },
    timestamp: {
        type: Date,
        required: "date is required",
    },
});

//Creating a peak model
const lpg = mongoose.model("lpg", lpgSchema);

module.exports = lpg;
