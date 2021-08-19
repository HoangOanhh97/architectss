const mongoose = require('mongoose');
const { Schema } = mongoose;
const { String } = Schema.Types;
const utils = require('../services/utils');

const newsSchema = new Schema(
    {
        category: { type: String, require: true },
        title: { type: String, required: true },
        descriptionHTML: { type: String },
        image: { type: String },
        link: { type: String }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
const News = mongoose.model('News', newsSchema);

exports.getNews = async () => {
    const result = await News.find();
    return result;
}

exports.getNewsByCategory = async (args) => {
    try {
        const { category } = JSON.parse(args.filter);
        const result = await Projects.find({ category });
        return result;
    } catch (error) {
        return utils.getStatus(false, error);
    }
}

exports.postArticle = async (input) => {
    try {
        const article = await News.create(input);
        return article;
    } catch (error) {
        return utils.getStatus(false, error);
    }
}

exports.updateArticle = async (newsTitle, input) => {
    try {
        const result = await News.findOneAndUpdate({ "title": newsTitle }, input, { returnOriginal: false });
        if (!result) return utils.getStatus(false, 'Cannot update article, try again!');
        return result;
    } catch (error) {
        return utils.getStatus(false, error);
    }
}

exports.deleteArticle = async (newsTitle) => {
    try {
        const result = await News.findOneAndDelete({ "title": newsTitle });
        return utils.getStatus(true, 'Delete article successfully!');
    } catch (error) {
        return utils.getStatus(false, error);
    }
}