const { gql } = require('apollo-server-express');
const { Members } = require('./repo/members');
const { Awards } = require('./repo/awards')

// Construct a schema, using GraphQL schema language
exports.typeDefs = gql`
    type Award {
        name: String
        content1: String
        content2: String
        content3: String
        imageUrl: String
    }
    type Member {
        id: Int!
        name: String
        role: String
        image: String
    }
    type Query {
        awards: [Award]
        members: [Member]
    }
    type Mutation {
        createMember(id: Int, name: String, role: String): Member
    }
`;

// Provide resolver functions for your schema fields
exports.resolvers = {
    Query: {
        members: () => Members,
        awards: () => Awards
    },
    Mutation: {
        createMember: (id, name, role) => Member,
    }
};