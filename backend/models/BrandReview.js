const mongoose = require('mongoose');

const brandReviewSchema = new mongoose.Schema({
    userName: { type: String, default: 'Anonymous' },
    reviewText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BrandReview', brandReviewSchema);