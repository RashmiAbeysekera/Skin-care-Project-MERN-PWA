const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number, // The numeric ID from your local file
    name: { type: String, required: true },
    category: String,
    price: { type: Number, required: true },
    isBestSeller: Boolean,
    image: String,
    description: String,
    subtitle: String,
    skinType: String,
    size: String,
    mrpNote: String,
    shippingInfo: String,
    certifications: [String],
    ingredients: String,
    fullDescription: String,
    benefits: String,
    howToUse: String,
    storage: String
});

module.exports = mongoose.model('Product', productSchema);