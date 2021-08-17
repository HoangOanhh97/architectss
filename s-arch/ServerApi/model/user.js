const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId, String } = Schema.Types;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
        password: { type: String, require: true, trim: true },
        decoded: { type: String, require: true }
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
    if (!email) {
        return getStatus(false, 'You are not authenticated.');
    };
    try {
        const user = await this.Users.findOne({ email }, 'name email created_at');
        const userRole = await User_Role.findOne({ user: user._id }).populate("role");

        const result = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: userRole.role.role
        };
        return result;
    } catch (error) {
        return getStatus(false, 'Login failed.');
    }
}

exports.getUsers = async () => {
    try {
        const result = await this.Users.find();
        return result;
    } catch (error) {
        return { status: getStatus(false, error) };;
    }
}

exports.getUserById = async (id) => {
    try {
        if (!id) throw new Error('You are not authenticated!');
        const result = await this.Users.findById(id);
        return result;
    } catch (error) {
        return { status: getStatus(false, error) };;
    }
}

exports.assignUserRole = async (data) => {
    const { userId, role } = data;
    const roleItem = await Roles.findOne({ role }, '_id');
    const userItem = await Roles.findById(userId, '_id');

    try {
        User_Role.create({ role: roleItem._id, user: userItem._id }).then((value) => {
            console.log(value);
        });

        return { success: true, message: "Assigned succesfully!" };
    } catch (error) {
        return { status: getStatus(false, error) };
    }
}

exports.createUser = async (data) => {
    const { name, email, role, password } = data;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const roleItem = await Roles.findOne({ role }, '_id');
    const newUser = {
        name,
        email,
        password: hashedPassword
    }

    let user;
    this.Users.create(newUser).then(async (response) => {
        user = response;

        await User_Role.create({ role: roleItem._id, user: response._id });

        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1y' });

        return {
            success: true,
            message: "Authentication succesfully!",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: roleItem.role
            }
        }
    }).catch(error => {
        console.log("Error registration: ", error);
        this.Users.deleteOne({ email })

        return { status: getStatus(false, error) };
    });
}

exports.login = async (data, context) => {
    const { email, password } = data;
    try {
        const user = await this.Users.findOne({ email });
        if (!user) {
            return {
                success: false,
                message: 'No user with that email',
                user: {
                    _id: "",
                    email: email
                }
            }
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return {
                success: false,
                message: 'Incorrect password',
                user: {
                    _id: "",
                    email: email
                }
            }
        }

        const userRole = await User_Role.findOne({ user: user._id }).populate("role");
        // return jwt
        const payload = { id: user["_id"], email: user["email"] };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            algorithm: "HS256", expiresIn: "1d"
        });
        await this.Users.findOneAndUpdate({ email }, { "decoded": token }, { returnOriginal: false });
        context.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            decoded: user.decoded,
            role: userRole.role.role,
        }

        return {
            success: true,
            message: 'Token is generated!',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: userRole.role.role
            }
        };
    } catch (error) {
        console.log("Error authenticate: ", error);
    }
}