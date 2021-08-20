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
        getUsers: () => User.getUsers(),
        getUserById: (_, { id }) => User.getUserById(id),
    },
    Mutation: {
        registerUser: (_, { input }) => User.createUser(input),
        login: (_, { input }, context, info) => User.login(input, context),
        assignUserRole: (_, { input }) => User.assignUserRole(input)
    }
}