const { gql } = require('apollo-server-express');
const { Members } = require('./repo/members');

const books = [{
    title: 'The Awakening',
    author: 'Kate Chopin',
},
{
    title: 'City of Glass',
    author: 'Paul Auster',
},
];

// Construct a schema, using GraphQL schema language
exports.typeDefs = gql`
    type Book {
        title: String
        author: String
    }
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
        books: [Book]
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
        books: () => books,
        members: () => Members
    },
    Mutation: {
        createMember: (id, name, role) => Member,
    }
};