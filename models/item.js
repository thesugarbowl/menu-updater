// Require mongoose
var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {type: String, required: true},
    name_feature: {type: String},
    category: {type: String, required: true},
    subcategory: {type: [String]},
    price_reg: {type: String},
    price_large: {type: String},
    price_bottle: {type: String},
    description: {type: String},
    diet: {type: [String]},
    availability: {type: String, enum: ['', 'Unavailable'], default: ''}
},
{timestamps: {createdAt: true, updatedAt: false}}
);

// Virtual for item's URL
ItemSchema
.virtual('url')
.get(function() {
    return '/menu/item/' + this._id;
});

// Export model
module.exports = mongoose.model('Item', ItemSchema);