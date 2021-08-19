const mongoose = require('mongoose');
const { Schema } = mongoose;
const { String, ObjectId } = Schema.Types;

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

exports.postArticle = async (input) => {
    await News.create(input).then((doc) => {
        return doc;
    }).catch(err => {
        return {
            success: false,
            message: err
        }
    });
}

exports.updateArticle = async (newsTitle, input) => {
    try {
        const result = await News.findOneAndUpdate({ "title": newsTitle }, input, { returnOriginal: false });
        if (!result) {
            return {
                success: false,
                message: 'Cannot update article, try again!'
            }
        }
        return result;
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

exports.deleteArticle = async (newsTitle) => {
    const result = await News.findOneAndDelete({ "title": newsTitle });
    console.log(result)
    return {
        success: true,
        message: 'Delete item successfully!'
    }
}