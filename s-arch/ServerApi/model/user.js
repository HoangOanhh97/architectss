const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId, String, Number } = Schema.Types;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const users = new Schema(
    {
        _id: { type: ObjectId, required: true },
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true
        },
        password: { type: String, require: true, trim: true },
        createdDate: { type: String, default: moment().toISOString() },
        role: {
            type: ObjectId,
            ref: 'user_role'
        }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)

const roles = new Schema(
    {
        _id: { type: ObjectId, require: true },
        role: {
            type: String,
            trim: true,
            unique: true,
            require: true
        },
        roleCode: { type: String, require: true }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)

const user_role = new Schema(
    {
        _id: { type: ObjectId, require: true },
        role: {
            type: ObjectId,
            ref: 'roles'
        },
        user: {
            type: ObjectId,
            unique: true,
            ref: 'users'
        }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)
exports.Users = mongoose.model('Users', users);
const Roles = mongoose.model('Roles', roles);
const User_Role = mongoose.model('User_Role', user_role);

exports.me = async (currentUser) => {
    console.log('currentUser: ', currentUser)
    if (!currentUserId) throw new Error('You are not authenticated');
    const result = await this.Users.findOne({ "email": currentUser.email });
    return result;
}

exports.getUsers = async () => {
    try {
        const result = await this.Users.find();
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getUserById = async (id) => {
    try {
        if (!id) throw new Error('You are not authenticated!');
        const result = await this.Users.findById(id);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.createUser = async ({ name, email, roleId, password }) => {
    try {
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const data = {
            name,
            email,
            password: hashedPassword
        }
        const user = await this.Users.create(data);
        console.log(user);
        const userRole = await User_Role.create({
            role: roleId,
            user: user["_id"]
        })

        const payload = { id: user["_id"], email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1y' });

        return {
            message: "Authentication succesfully!",
            token,
            user: {
                id: user["_id"],
                name: user.name,
                email: user.email,
                role: userRole.role
            }
        }
    } catch (error) {
        console.log("Error registration: ", error);
    }
}

exports.login = async ({ email, password }) => {
    try {
        const user = await this.Users.findOne({ email });
        if (!user) {
            throw new Error('No user with that email')
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            throw new Error('Incorrect password')
        }
        
        const userRole = await User_Role.findOne({user: user["_id"]}).populate("role");
        // return jwt
        const payload = { id: user["_id"], email: user["email"] };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "600d" // expires in 7 days 
        });

        return {
            success: true,
            message: 'token is generated!',
            token,
            user: {
                id: user["_id"],
                name: user.name,
                email: user.email,
                role: userRole
            }
        };
    } catch (error) {
        console.log("Error authenticate: ", error);
    }
}