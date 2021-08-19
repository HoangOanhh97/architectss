const News = require('../model/news');

exports.NewsResolvers = {
    Response: {
        __resolveType: (obj) => {
            if (obj.category) {
                return 'News';
            }
            if (obj.message) {
                return 'Message';
            }
            return null;
        }
    },
    Query: {
        getNews: () => News.getNews(),
    },
    Mutation: {
        postArticle: (_, { input }) => News.postArticle(input),
        updateArticle: (_, args) => News.updateArticle(args.newsTitle, args.input),
        deleteArticle: (_, { newsTitle }) => News.deleteArticle(newsTitle)
    }
}