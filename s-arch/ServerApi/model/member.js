const mongoose = require('mongoose');
const { Schema } = mongoose;
const { String, Number } = Schema.Types;

const MemberSchema = new Schema(
    {
        _id: { type: Number, required: true },
        id: { type: Number, required: true },
        name: { type: String, required: true },
        role: { type: String },
        image: { type: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
exports.Members = mongoose.model('Members', MemberSchema);