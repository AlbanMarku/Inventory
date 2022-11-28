const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema;

const itemSchema = new ItemSchema(
  {
    name: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
