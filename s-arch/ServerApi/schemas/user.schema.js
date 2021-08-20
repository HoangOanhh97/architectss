const User = require('../model/user');

exports.UserResolvers = {
    Response: {
        __resolveType: (obj) => {
            if (obj.name) {
                return 'User';
            }
            if (obj.message) {
                return 'Message';
            }
            return null;
        }
    },
    Query: {
        me: (_, args, context) => User.me(context.token),
        getUsers: (_, args, context) => User.getUsers(context.token),
        getUserDetails: (_, { email }, context) => User.getUserDetails(context.token, email),
    },
    Mutation: {
        registerUser: (_, { input }) => User.createUser(input),
        login: (_, { input }, context, info) => User.login(input, context),
        assignUserRole: (_, { input }) => User.assignUserRole(input)
    }
}