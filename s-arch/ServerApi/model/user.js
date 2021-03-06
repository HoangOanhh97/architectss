const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId, String } = Schema.Types;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const utils = require('../services/utils');

const user_role = new Schema(
    {
        role: {
            type: ObjectId,
            require: true,
            ref: 'roles'
        },
        user: {
            type: ObjectId,
            require: true,
            unique: true,
            ref: 'users'
        }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)

const users = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true
        },
        password: { type: String, require: true, trim: true }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
)

const roles = new Schema(
    {
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
exports.Users = mongoose.model('users', users);
const Roles = mongoose.model('roles', roles);
const User_Role = mongoose.model('user_role', user_role);

const getStatus = (status, mess) => {
    return {
        success: status,
        message: mess
    }
}

exports.me = async (email) => {
    try {
        const user = await this.Users.findOne({ email }, 'name email created_at');
        const userRole = await User_Role.findOne({ user: user._id }).populate("role");

        const result = {
            ...user._doc,
            role: userRole.role.role
        };
        return result;
    } catch (error) {
        return utils.getStatus(false, 'Login failed.');
    }
}

exports.getUsers = async () => {
    try {
        return await this.Users.find();
    } catch (error) {
        return utils.getStatus(false, error);
    }
}

exports.getUserDetails = async (email) => {
    try {
        const user = await this.Users.findOne({ email }, 'name email created_at');
        const userRole = await User_Role.findOne({ user: user._id }).populate("role");
        return {
            ...user._doc,
            role: userRole.role.role
        };
    } catch (error) {
        return utils.getStatus(false, error);
    }
}

exports.assignUserRole = async ({ email }, data) => {
    const currentUser = await this.getUserDetails(email);
    if (!currentUser || (currentUser && currentUser.role !== 'Admin')) {
        return utils.getStatus(false, 'You do not have permission.')
    }

    const { userId, role } = data;
    const roleItem = await Roles.findOne({ role }, '_id');
    const userItem = await Roles.findById(userId, '_id');
    try {
        User_Role.create({ role: roleItem._id, user: userItem._id }).then((value) => {
            console.log(value);
        });

        return utils.getStatus(true, "Assigned succesfully!");
    } catch (error) {
        return utils.getStatus(false, error);
    }
}

exports.createUser = async (data) => {
    const { name, email, role } = data;
    const roleItem = await Roles.findOne({ role }, '_id');

    const pwd = new Buffer.from(data.password, 'base64').toString('ascii');
    const hashedPassword = await bcrypt.hashSync(pwd, 10);
    const newUser = {
        name,
        email,
        password: hashedPassword
    }
    try {
        const result = await this.Users.create(newUser);
        if (result && result.email) {
            await User_Role.create({ role: roleItem._id, user: result._id });

            const payload = { email: result["email"] };
            const token = await jwt.sign(payload, process.env.JWT_SECRET, {
                algorithm: "HS256", expiresIn: "1y"
            });
            return { success: true, message: "Authentication succesfully!", token };
        }
        return { success: false, message: 'Registration failed', token: " " };
    } catch (error) {
        console.log("Error registration: ", error);
        this.Users.deleteOne({ email });
        return { success: false, message: error, token: " " };
    }
}

exports.login = async (data) => {
    try {
        const user = await this.Users.findOne({ email: data.email });
        if (!user) {
            return utils.getStatus(false, 'No user with that email');
        }
        const pwd = Buffer.from(data.password, 'base64').toString('ascii');
        const isValid = await bcrypt.compare(pwd, user.password);
        if (!isValid) {
            return utils.getStatus(false, 'Incorrect password');
        }
        // return jwt
        const payload = { email: user["email"] };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            algorithm: "HS256", expiresIn: "2d"
        });

        return { success: true, message: 'Token is generated!', token };
    } catch (error) {
        console.log("Error authenticate: ", error);
    }
}