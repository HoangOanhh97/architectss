const mongoose = require('mongoose');
const { Schema } = mongoose;
const { String, Number } = Schema.Types;

const memberSchema = new Schema(
    {
        _id: { type: Number, required: true },
        name: { type: String, required: true },
        role: { type: String },
        image: { type: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
const Members = mongoose.model('Members', memberSchema);

exports.getMembers = async () => {
    const result = await Members.find();
    return result;
}

exports.getProfileById = async (id) => {
    const result = Members.findById(id);
    return result;
}

exports.getProfileByIds = async (ids) => {
    const result = Members.find({ _id: { $in: ids } }, 'name');
    return result;
}

exports.createMember = async (data) => {
    const reault = await Members.create(data);
    return result;
}

exports.updateMemberProfile = async (id, data) => {
    const result = await Members.findOneAndUpdate({ id }, data, {
        returnOriginal: false
    });
    console.log(result);
    return result;
}

