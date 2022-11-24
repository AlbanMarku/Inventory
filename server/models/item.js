const mongoose = require("mongoose");

const schema = mongoose.Schema;

const itemSchema = new schema({
    name: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;