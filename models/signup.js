const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const udSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  
}, { timestamps: true });

const Sup = mongoose.model('Sup', udSchema);
module.exports = Sup;