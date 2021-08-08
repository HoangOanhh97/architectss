const { Members } = require('../model/member');

exports.MemberResolvers = {
    Query: {
        getMembers: () => Members.find(),
        getMemberById: (id) => Members.findById(id)
    },
    Mutation: {
        createMember(input) {
            const newMember = new Member(input);
            return newMember.save()
                .then(result => {
                    return { ...result._id }
                })
                .catch(err => {
                    console.error(err)
                })
        },
    }
}