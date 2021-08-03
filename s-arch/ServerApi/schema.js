const { gql } = require('apollo-server-express');
const { Members } = require('./model/member');
const { Awards } = require('./model/award');
const { News } = require('./model/news');
const { P_Types, P_Images, P_Members, Projects } = require('./model/project');

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
    type Project_Type {
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
        getNews: [News]
        getProjectTypes: [Project_Type]
        getProjects: [Project]
    }

    input MemberInput {
        name: String!
        role: String
        image: String
    }
    type Mutation {
        createMember(input: MemberInput!): Member
    }
`;

// Provide resolver functions for your schema fields
exports.resolvers = {
    Query: {
        getMembers: () => Members.find(),
        getAwards: () => Awards.find(),
        getNews: () => News.find(),
        getProjectTypes: () => P_Types.find(),
        getProjects: () => Projects.find()
    },
    Mutation: {
        createMember(input) {
            const newMember = new Member(input);
            return newMember.save()
                .then(result => {
                    return { ...result._id }
                })
                .catch(err => {
                    console.error(err)
                })
        },
    }
};