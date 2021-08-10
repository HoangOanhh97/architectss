const projectsModel = require('../model/project')

exports.ProjectsResolvers = {
    Query: {
        getProjectTypes: () => projectsModel.getProjectTypes(),
        getProjects: (_, args) => projectsModel.getProjects(args),
        getProjectById: (_, { idNumber }) => projectsModel.getProjectById(idNumber),
        getImagesByProjectId: (_, { projectId }) => projectsModel.getProjectImagesById(projectId),
        getProjectMembers: (_, { projectId }) => projectsModel.getProjectMembersById(projectId),
    },
    Mutation: {
        async createProject(input) {
            await Projects.create(input).then(result => {
                return { ...result._id };
            }).catch(err => {
                console.error(err);
                return false;
            })
        },
    }
};