const { News } = require('../model/news');

exports.NewsResolvers = {
    Query: {
        getNews: () => News.find(),
    },
    Mutation: {

    }
}