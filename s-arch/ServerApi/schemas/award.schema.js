const { Awards } = require('../model/award');

exports.AwardsResolvers = {
    Query: {
        getAwards: () => Awards.find(),
    },
    Mutation: {
        async updateAward(awardId, data) {
            const filter = { "_id": awardId };
            let award = await Awards.findOneAndUpdate(filter, { content1: data }, { new: true });
            return { ...award.name };
        }
    }
}