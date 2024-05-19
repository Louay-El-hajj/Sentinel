const mongoose = require("mongoose");

const avg_tempsSchema = mongoose.Schema({
    item_id: {
        type: String,
        required: "Worker id required",
    },
    day: {
        type: Object,
        required: "date required",
    },
    avg_temperature: {
        type: Number,
        required: "average temperature required",
    },
});

const avg_temp = mongoose.model("temperatureAverage", temperatureAveragesSchema);

module.exports =avg_temp;
