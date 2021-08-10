const Member = require('../model/member');

exports.MemberResolvers = {
    Query: {
        getMembers: () => Member.getMembers(),
        getMemberById: (_, { id }) => Member.getProfileById(id)
    },
    Mutation: {
        createMember: (_, { input }) => Member.createMember(input),
    }
}