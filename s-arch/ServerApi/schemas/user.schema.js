const User = require('../model/user');
const utils = require('../services/utils');

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
        me: (_, args, { user }) => {
            utils.isAuthenticated({ user });
            return User.me(user.email);
        },
        getUsers: (_, args, context) => {
            utils.isAuthenticated(context);
            return User.getUsers();
        },
        getUserDetails: (_, { email }, context) => {
            utils.isAuthenticated(context);
            return User.getUserDetails(email);
        },
    },
    Mutation: {
        registerUser: (_, { input }) => User.createUser(input),
        login: (_, { input }, context, info) => User.login(input, context),
        assignUserRole: (_, { input }, { user }) => {
            utils.isAuthenticated({ user });
            return User.assignUserRole(user, input);
        }
    }
}
