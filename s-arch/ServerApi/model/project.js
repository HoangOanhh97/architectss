const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId, String, Number, Array } = Schema.Types;

const p_typeSchema = new Schema(
    {
        _id: { type: Number, required: true },
        typeId: { type: Number },
        typeName: { type: String },
        mainBg: { type: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
p_typeSchema.set('autoIndex', true)

const p_imagesSchema = new Schema(
    {
        _id: { type: ObjectId, required: true },
        projectId: { type: Number, required: true },
        url: { type: String, required: true },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
p_imagesSchema.set('autoIndex', true)

const p_membersSchema = new Schema(
    {
        _id: { type: ObjectId, required: true },
        projectId: { type: Number, required: true },
        memberId: { type: Number, required: true },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
p_membersSchema.set('autoIndex', true)

const ProjectSchema = new Schema(
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

exports.P_Types = mongoose.model('ProjectTypes', p_typeSchema);
exports.P_Images = mongoose.model('ProjectImages', p_imagesSchema);
exports.P_Members = mongoose.model('ProjectMembers', p_membersSchema);
exports.Projects = mongoose.model('Projects', ProjectSchema);