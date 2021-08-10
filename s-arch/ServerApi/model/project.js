const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId, String, Number, Array } = Schema.Types;

const p_typeSchema = new Schema(
    {
        _id: { type: Number, required: true },
        typeId: { type: Number, required: true },
        typeName: { type: String, required: true },
        mainBg: { type: String, required: true },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
p_typeSchema.set('autoIndex', true);

const p_imagesSchema = new Schema(
    {
        _id: { type: ObjectId, required: true },
        projectId: { type: Number, required: true },
        url: { type: String, required: true },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
p_imagesSchema.set('autoIndex', true);

const p_membersSchema = new Schema(
    {
        _id: { type: ObjectId, required: true },
        projectId: { type: Number, required: true },
        memberId: { type: Number, required: true },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
p_membersSchema.set('autoIndex', true);

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
            ref: 'p_imagesSchema'
        },
        participants: {
            type: Array,
            ref: 'p_membersSchema'
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
projectSchema.set('autoIndex', true);

const P_Types = mongoose.model('Project_Types', p_typeSchema);
const P_Images = mongoose.model('Project_Images', p_imagesSchema);
const P_Members = mongoose.model('Project_Members', p_membersSchema);
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
    const result = await P_Members.find({ projectId });
    return result;
}