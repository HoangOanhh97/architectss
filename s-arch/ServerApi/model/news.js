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
newsSchema.set('autoIndex', true);
const News = mongoose.model('News', newsSchema);

exports.getNews = async () => {
    await News.find((err, res) => {
        if (err) {
            return [...err];
        }
        return res;
    })
}

exports.getNewsByCategory = async (args) => {
    const { category } = JSON.parse(args.filter);
    return Projects.find({ category }, (err, res) => {
        if (err) {
            return [...err];
        }
        return res;
    });
}