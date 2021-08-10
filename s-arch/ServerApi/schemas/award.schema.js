const Awards = require('../model/award');

exports.AwardsResolvers = {
    Query: {
        getAwards: () => Awards.getAwards(),
    },
    Mutation: {
        updateAward: (_, args) => Awards.updateAwardById(args)
    }
}