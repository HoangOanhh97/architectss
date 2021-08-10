const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId, String } = Schema.Types;

const newsSchema = new Schema(
    {
        _id: { type: ObjectId, required: true },
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