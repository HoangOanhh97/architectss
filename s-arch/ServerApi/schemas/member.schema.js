const { Members } = require('../model/member');

exports.MemberResolvers = {
    Query: {
        getMembers: () => Members.find(),
        getMemberById: (memberId) => Members.findById({_id: parseInt(memberId, 10)})
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