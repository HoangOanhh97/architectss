const Project = require('../model/project');

exports.ProjectsResolvers = {
    Query: {
        getProjectTypes: () => Project.getProjectTypes(),
        getProjects: (_, args) => Project.getProjects(args),
        getProjectById: (_, { idNumber }) => Project.getProjectById(idNumber),
        getProjectImagesById: (_, { projectId }) => Project.getProjectImagesById(projectId),
        getProjectMembersById: (_, { projectId }) => Project.getProjectMembersById(projectId),
    },
    Mutation: {
        createProject: (_, { input }) => Project.createProject(input)
    }
};