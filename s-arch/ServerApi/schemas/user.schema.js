const User = require('../model/user');

exports.UserResolvers = {
    Query: {
        me: (_, args, { user }) => User.me(user),
        getUsers: () => User.getUsers(),
        getUserById: (_, { id }) => User.getUserById(id),
    },
    Mutation: {
        registerUser: (_, args) => User.createUser(args),
        login: (_, args) => User.login(args)
    }
}