const { gql } = require('apollo-server-express');
const { UserResolvers } = require('./schemas/user.schema');
const { AwardsResolvers } = require('./schemas/award.schema');
const { NewsResolvers } = require('./schemas/news.schema');
const { MemberResolvers } = require('./schemas/member.schema');
const { ProjectsResolvers } = require('./schemas/project.schema');
const { GraphQLScalarType } = require('graphql');

// Construct a schema, using GraphQL schema language
exports.typeDefs = gql`
    scalar Date

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
        memberName: String
    }
    type User {
        _id: String
        name: String
        email: String
        role: String
    }
    type UserRole {
        _id: String
        role: String
        user: String
    }
    type AuthPayload {
        success: Boolean
        message: String
        token: String
        user: User
    }
    type Message {
        success: Boolean
        message: String
    }
    union UserResponse = User | Message
    type Query {
        me: UserResponse
        getUsers: [UserResponse]
        getUserById(id: Int!): UserResponse
        getAwards: [Award]
        getMembers: [Member]
        getMemberById(id: Int): Member
        getNews: [News]
        getProjectTypes: [ProjectType]
        getProjects(filter: String): [Project]
        getProjectById(idNumber: Int!): Project
        getProjectImagesById(projectId: Int!): [Project_Image]
        getProjectMembersById(projectId: Int!): [Project_Member]
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
    input NewUserInput {
        name: String!
        email: String! 
        password: String!
        role: String!
    }
    input UserInput {
        email: String!
        password: String!
    }
    input UserRoleInput {
        userId: String
        role: String
    }
    type Mutation {
        registerUser(input: NewUserInput!): AuthPayload!
        login(input: UserInput!): AuthPayload!
        assignUserRole(input: UserRoleInput!): Message!
        createMember(input: MemberInput!): Member
        createProject(input: ProjectInput!): Project
        updateAward(awardId: Int!, data: String): Award
    }
`;

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

// Provide resolver functions for your schema fields
exports.resolvers = {
    Date: dateScalar,
    UserResponse: {
        __resolveType(obj) {
            if (obj.user) {
                return 'User';
            }
            if (obj.message) {
                return 'Message';
            }
            return null;
        }
    },
    Query: {
        ...UserResolvers.Query,
        ...AwardsResolvers.Query,
        ...NewsResolvers.Query,
        ...MemberResolvers.Query,
        ...ProjectsResolvers.Query,
    },
    Mutation: {
        ...UserResolvers.Mutation,
        ...AwardsResolvers.Mutation,
        ...MemberResolvers.Mutation,
        ...ProjectsResolvers.Mutation,
    }
};