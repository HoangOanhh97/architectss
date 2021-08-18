const mongoose = require('mongoose');
const { Schema } = mongoose;
const { String } = Schema.Types;

const newsSchema = new Schema(
    {
        category: { type: String, require: true },
        title: { type: String, required: true },
        descriptionHTML: { type: String },
        image: { type: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
const News = mongoose.model('News', newsSchema);

exports.getNews = async () => {
    const result = await News.find();
    return result;
}

exports.getNewsByCategory = async (args) => {
    const { category } = JSON.parse(args.filter);
    const result = await Projects.find({ category });
    return result;
}

exports.postNews = async (input) => {
    await News.create(input).then((doc) => {
        return doc;
    }).catch(err => {
        return {
            success: false,
            message: err
        }
    });
}

exports.updatedNews = async (newId, input) => {
    const result = await News.findByIdAndUpdate(newId, input, { returnOriginal: false });
    return result;
}

exports.deletedNews = async (newId) => {
    await News.findByIdAndDelete(newId, (err, doc) => {
        if (err) {
            return {
                success: false,
                message: err
            }
        }
        return {
            success: true,
            message: 'Updated Successfully!'
        }
    })
}