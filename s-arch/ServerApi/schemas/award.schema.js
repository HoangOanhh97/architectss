const { Awards } = require('../model/award');

exports.AwardsResolvers = {
    Query: {
        getAwards: () => Awards.find(),
    },
    Mutation: {
        async updateAward(_, { awardId, data }) {
            const filter = { "_id": awardId };
            const update = { content1: data };
            let award = await Awards.findOneAndUpdate(filter, update, { new: true });
            return { ...award.name };
        }
    }
}