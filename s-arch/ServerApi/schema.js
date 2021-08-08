const { gql } = require('apollo-server-express');
const { AwardsResolvers } = require('./schemas/award.schema');
const { NewsResolvers } = require('./schemas/news.schema');
const { MemberResolvers } = require('./schemas/member.schema');
const { ProjectsResolvers } = require('./schemas/project.schema');

// Construct a schema, using GraphQL schema language
exports.typeDefs = gql`
    type Award {
        _id: Int
        name: String
        content1: String
        content2: String
        content3: String
        imageUrl: String
    }
    type Member {
        _id: Int
        name: String
        role: String
        image: String
    }
    type News {
        _id: String
        category: String
        title: String
        image: String
        descriptionHTML: String
    }
    type Project {
        _id: Int
        idNumber: Int
        name: String
        client: String
        acreage: String
        location: String
        country: String
        overallView: String
        overallView1920: String
        listView: [Project_Image]
        description1: String
        description2: String
        participants: [Project_Member]
        status: String
        yearDone: String
        typeId: Int
        typeName: String
        done: Boolean
    }
    type ProjectType {
        _id: Int
        typeId: Int
        typeName: String
        mainBg: String
    }
    type Project_Image {
        projectId: Int
        url: String
    }
    type Project_Member {
        projectId: Int
        memberId: Int
    }
    type Query {
        getAwards: [Award]
        getMembers: [Member]
        getMemberById(id: Int): Member
        getNews: [News]
        getProjectTypes: [ProjectType]
        getProjects: [Project]
        getProjectById(idNumber: Int!): Project
        getImagesByProjectId(projectId: Int!): [Project_Image]
        getProjectMembers(projectId: Int!): [Project_Member]
    }
    input MemberInput {
        name: String!
        role: String
        image: String
    }
    input ProjectInput {
        name: String!
        client: String!
        overallView: String
        description1: String
        description2: String
        typeId: Int
        done: Boolean
    }
    type Mutation {
        createMember(input: MemberInput!): Member
        createProject(input: ProjectInput!): Project
    }
`;

// Provide resolver functions for your schema fields
exports.resolvers = {
    Query: {
        ...AwardsResolvers.Query,
        ...NewsResolvers.Query,
        ...MemberResolvers.Query,
        ...ProjectsResolvers.Query,
    },
    Mutation: {
        ...MemberResolvers.Mutation,
        ...ProjectsResolvers.Mutation,
    }
};