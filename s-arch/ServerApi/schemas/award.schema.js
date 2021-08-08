const { Awards } = require('../model/award');

exports.AwardsResolvers = {
    Query: {
        getAwards: () => Awards.find(),
    },
    Mutation: {

    }
}