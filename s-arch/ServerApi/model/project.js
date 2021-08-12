const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId, String, Number, Array } = Schema.Types;
const _ = require('lodash');
const Members = require('./member');

const project_types = new Schema(
    {
        _id: { type: Number, required: true },
        typeId: { type: Number, required: true },
        typeName: { type: String, required: true },
        mainBg: { type: String, required: true },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)

const project_images = new Schema(
    {
        _id: { type: ObjectId, required: true },
        projectId: { type: Number, required: true },
        url: { type: String, required: true },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)

const project_members = new Schema(
    {
        _id: { type: ObjectId, required: true },
        projectId: { type: Number, required: true },
        memberId: { type: Number, required: true },
        memberName: { type: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)

const projectSchema = new Schema(
    {
        _id: { type: Number, required: true },
        idNumber: { type: Number, required: true },
        name: { type: String },
        client: { type: String },
        acreage: { type: String },
        location: { type: String },
        country: { type: String },
        overallView: { type: String },
        overallView1920: { type: String },
        listView: {
            type: Array,
            ref: 'project_images'
        },
        participants: {
            type: Array,
            ref: 'project_members'
        },
        description1: { type: String },
        description2: { type: String },
        status: { type: String },
        yearDone: { type: String },
        typeId: { type: Number, required: true },
        typeName: { type: String },
        done: { type: Boolean, default: false }
    }
)

const P_Types = mongoose.model('Project_Types', project_types);
const P_Images = mongoose.model('Project_Images', project_images);
const P_Members = mongoose.model('Project_Members', project_members);
const Projects = mongoose.model('Projects', projectSchema);

exports.getProjectTypes = async () => {
    const result = await P_Types.find();
    return result;
};

exports.getProjects = async (args) => {
    const { typeId } = JSON.parse(args.filter);
    let result;
    if (typeId) {
        result = await Projects.find({ typeId });
    } else {
        result = await Projects.find();
    }
    return result;
}

exports.getProjectById = async (idNumber) => {
    const result = await Projects.findOne({ idNumber });
    return result;
}

exports.getProjectImagesById = async (projectId) => {
    const result = await P_Images.find({ projectId });
    return result;
}

exports.getProjectMembersById = async (projectId) => {
    let result = await P_Members.find({ projectId });
    const memberIds = _.map(result, i => i.memberId);
    const members = await Members.getProfileByIds(memberIds);
    _.each(result, ele => {
        const exist = _.find(members, { "_id": ele.memberId }) || {};
        ele.memberName = exist.name;
    });
    return result;
}

exports.createProject = async (data) => {
    const result = await P_Members.create(data);
    return result;
}