const mongoose = require('mongoose');
const { Schema } = mongoose;
const { String, Number } = Schema.Types;

const memberSchema = new Schema(
    {
        _id: { type: Number, required: true },
        id: { type: Number, required: true },
        name: { type: String, required: true },
        role: { type: String },
        image: { type: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
memberSchema.set('autoIndex', true);
const Members = mongoose.model('Members', memberSchema);

exports.getMembers = async () => {
    await Members.find((err, res) => {
        if (err) {
            return [...err];
        }
        return res;
    })
}

exports.getProfileById = async (id) => {
    const result = Members.findById(id);
    return result;
}

exports.createMember = async (data) => {
    await Members.create(data).then(result => {
        return { ...result._id };
    }).catch(err => {
        return err;
    });
}

exports.updateMemberProfile = async (id, data) => {
    const result = await Members.findOneAndUpdate({ id }, data, {
        returnOriginal: false
    });
    console.log(result);
    return result;
}

