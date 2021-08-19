const News = require('../model/news');

exports.NewsResolvers = {
    Query: {
        getNews: () => News.getNews(),
    },
    Mutation: {
        postArticle: (_, { input }) => News.postArticle(input),
        updateArticle: (_, { newId, input }) => News.updateArticle(newId, input),
        deleteArticle: (_, { newId }) => News.deleteArticle(newId)
    }
}