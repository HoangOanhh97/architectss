const mongoose = require('mongoose');
const { Schema } = mongoose;
const { String } = Schema.Types;

const awardSchema = new Schema(
    {
        name: { type: String, required: true },
        content1: { type: String },
        content2: { type: String },
        content3: { type: String },
        imageUrl: { type: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
const Awards = mongoose.model('Awards', awardSchema);

exports.getAwards = async () => {
    const result = await Awards.find();
    return result;
}

exports.createAward = async (data) => {
    const result = await Awards.create(data);
    return result;
}

exports.updateAwardById = async (args) => {
    const update = { "content3": args.data };
    const result = await Awards.findByIdAndUpdate(args.awardId, update, {
        returnOriginal: false
    });
    return result;
}