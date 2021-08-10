const Project = require('../model/project');

exports.ProjectsResolvers = {
    Query: {
        getProjectTypes: () => Project.getProjectTypes(),
        getProjects: (_, args) => Project.getProjects(args),
        getProjectById: (_, { idNumber }) => Project.getProjectById(idNumber),
        getImagesByProjectId: (_, { projectId }) => Project.getProjectImagesById(projectId),
        getProjectMembers: (_, { projectId }) => Project.getProjectMembersById(projectId),
    },
    Mutation: {
        // async createProject(input) {
        //     await Projects.create(input).then(result => {
        //         return { ...result._id };
        //     }).catch(err => {
        //         console.error(err);
        //         return false;
        //     })
        // },
    }
};