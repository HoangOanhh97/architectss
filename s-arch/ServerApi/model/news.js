const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId, String } = Schema.Types;

const NewsSchema = new Schema(
    {
        _id: { type: ObjectId, required: true },
        category: { type: String, require: true },
        title: { type: String, required: true },
        descriptionHTML: { type: String },
        image: { type: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
exports.News = mongoose.model('News', NewsSchema);