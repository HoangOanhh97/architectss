const mongoose = require('mongoose');
const { Schema } = mongoose;
const { String, Number } = Schema.Types;

const AwardSchema = new Schema(
    {
        _id: { type: Number, required: true },
        name: { type: String, required: true },
        content1: String,
        content2: String,
        content3: String,
        imageUrl: String,
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
exports.Awards = mongoose.model('Awards', AwardSchema);