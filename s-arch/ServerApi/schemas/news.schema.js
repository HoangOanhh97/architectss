const News = require('../model/news');

exports.NewsResolvers = {
    Query: {
        getNews: () => News.getNews(),
    },
    Mutation: {
        postNews: (_, {input}) => News.postNews(input)
    }
}