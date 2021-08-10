const mongoose = require('mongoose');
const { Schema } = mongoose;
const { String, Number } = Schema.Types;

const awardSchema = new Schema(
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
awardSchema.set('autoIndex', true);
const Awards = mongoose.model('Awards', awardSchema);

exports.getAwards = async () => {
    await Awards.find((err, res) => {
        if (err) {
            return [...err];
        }
        return res;
    })
}

exports.createAward = async (data) => {
    await Awards.create(data).then(result => {
        return { ...result._id };
    }).catch(err => {
        return err;
    })
}

exports.updateAwardById = async (id, data) => {
    const result = await Awards.findByIdAndUpdate({ id }, data, {
        returnOriginal: false
    });
    console.log(result);
    return result;
}