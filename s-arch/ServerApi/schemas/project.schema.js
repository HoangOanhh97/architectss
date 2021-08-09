const { P_Types, Projects, ProjectById, ImagesByProjectId, ProjectMembers } = require('../model/project')

exports.ProjectsResolvers = {
    Query: {
        getProjectTypes: () => P_Types.find(),
        getProjects: (_, args) => {
            const filter = JSON.parse(args.filter);
            if (filter.typeId) {
                return Projects.find({ typeId: filter.typeId })
            }
            return Projects.find()
        },
        getProjectById: (_, { idNumber }) => ProjectById(idNumber),
        getImagesByProjectId: (_, { projectId }) => ImagesByProjectId(projectId),
        getProjectMembers: (_, { projectId }) => ProjectMembers(projectId),
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