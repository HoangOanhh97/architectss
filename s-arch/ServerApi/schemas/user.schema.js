const User = require('../model/user');

exports.UserResolvers = {
    Query: {
        me: (_, args, { user }) => User.me(user),
        getUsers: () => User.getUsers(),
        getUserById: (_, { id }) => User.getUserById(id),
    },
    Mutation: {
        registerUser: (_, { input }) => User.createUser(input),
        login: (_, { input }) => User.login(input),
        assignUserRole: (_, { input }) => User.assignUserRole(input)
    }
}