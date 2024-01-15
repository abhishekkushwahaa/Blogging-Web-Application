const { createHmac, randomBytes } = require('node:crypto');
const { Schema, model } = require('mongoose');
const { generateToken } = require('../services/authentication');

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    profilePicture: {
        type: String,
        default: '/assets/users.png',
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
}, { timestamps: true });

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return

    const salt = "someRandomSalt";

    const hash = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    this.salt = salt;
    this.password = hash;
    next();
});

userSchema.statics.matchPasswordAndGenerateToken = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        console.log(`User with email ${email} not found`);
        throw new Error('User not found');
    }

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    if (hashedPassword !== userProvidedHash) {
        console.log(`Password does not match for user with email ${email}`);
        throw new Error('Password does not match');
    }

    const token = generateToken(user);
    return token;
};


const User = model('user', userSchema);
module.exports = User;