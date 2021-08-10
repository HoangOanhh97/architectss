const mongoose = require('mongoose');
const { Schema } = mongoose;
const { String, Number, Date } = Schema.Types;

const UserSchema = new Schema(
    {
        _id: { type: Number, required: true },
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true
        },
        password: { type: String, require: true, trim: true },
        createdDate: { type: Date, default: new Date() }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
UserSchema.set('autoIndex', true);
const Users = mongoose.model('Users', MemberSchema);