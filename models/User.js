import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Correo no válido'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'Debe tener al menos 6 caracteres'],
        select: false,
    },
    avatar: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    globalRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = function (passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;


