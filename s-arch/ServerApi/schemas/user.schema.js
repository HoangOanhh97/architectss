const User = require('../model/user');

exports.UserResolvers = {
    Query: {
        me: (_, { email }, context, info) => User.me(email),
        getUsers: () => User.getUsers(),
        getUserById: (_, { id }) => User.getUserById(id),
    },
    Mutation: {
        registerUser: (_, { input }) => User.createUser(input),
        login: (_, { input }, context, info) => User.login(input, context),
        assignUserRole: (_, { input }) => User.assignUserRole(input)
    }
}