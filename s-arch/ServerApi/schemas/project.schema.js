const { P_Types, Projects, ProjectById, ImagesByProjectId, ProjectMembers } = require('../model/project')

exports.ProjectsResolvers = {
    Query: {
        getProjectTypes: () => P_Types.find(),
        getProjects: () => Projects.find(),
        getProjectById: (_, {idNumber}) => ProjectById(idNumber),
        getImagesByProjectId: (_, {projectId}) => ImagesByProjectId(projectId),
        getProjectMembers: (_, {projectId}) => ProjectMembers(projectId),
    },
    Mutation: {
        createProject(input) {
            const newProject = new Projects(input);
            return newProject.save()
                .then(result => {
                    return { ...result._id }
                })
                .catch(err => {
                    console.error(err)
                })
        },
    }
};