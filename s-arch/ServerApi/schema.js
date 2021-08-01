const { gql } = require('apollo-server-express');
const { Members } = require('./dataSources/members');
const { Awards } = require('./dataSources/awards');
const { News } = require('./dataSources/news');
const { ProjectTypes, Projects } = require('./dataSources/projects');

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
    type News {
        title: String
        image: String
        descriptionHTML: String
    }
    type Project {
        idNumber: Int
        name: String
        client: String
        acreage: String
        location: String
        country: String
        overallView: String
        overallView1920: String
        listView: [ItemView]
        description1: String
        description2: String
        participants: [Member]
        status: String
        yearDone: String
        typeId: Int
        typeName: String
        done: Boolean
    }
    type ProjectType {
        typeId: Int
        typeName: String
        mainBg: String
    }
    type ItemView {
        id: Int
        url: String
    }
    type Query {
        getAwards: [Award]
        getMembers: [Member]
        getNews: [News]
        getProjectTypes: [ProjectType]
        getProjects: [Project]
    }
    input MemberInput {
        name: String!
        role: String
    }
    type Mutation {
        createMember(input: MemberInput!): Member
    }
`;

// Provide resolver functions for your schema fields
exports.resolvers = {
    Query: {
        getMembers: () => Members,
        getAwards: () => Awards,
        getNews: () => News,
        getProjectTypes: () => ProjectTypes,
        getProjects: () => Projects
    },
    Mutation: {
        createMember: (input) => Member,
    }
};