const mongoose = require('mongoose');
const { Schema } = mongoose;
const { String, Number } = Schema.Types;

const AwardSchema = new Schema(
    {
        _id: { type: Number, required: true },
        name: { type: String, required: true },
        content1: { type: String },
        content2: { type: String },
        content3: { type: String },
        imageUrl: { type: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
exports.Awards = mongoose.model('Awards', AwardSchema);