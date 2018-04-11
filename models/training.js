let mongoose = require('mongoose');

//Training Schema

let trainingSchema = mongoose.Schema({

    product_code: {
        type: String,
        required: true,
        unique: true
      },
    saved_assets: {
        type: Number
      },
    failed_assets: {
        type: Number
      },
    total_assets: {
        type: Number
      }

});

let Training = module.exports = mongoose.model('Training', trainingSchema);