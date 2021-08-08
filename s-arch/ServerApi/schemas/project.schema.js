const { P_Types, P_Images, P_Members, Projects } = require('../model/project')

exports.ProjectsResolvers = {
    Query: {
        getProjectTypes: () => P_Types.find(),
        getProjects: () => Projects.find(),
        getProjectById: (projectId) => Projects.findById({idNumber: parseInt(projectId, 10)})
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