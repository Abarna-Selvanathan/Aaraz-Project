import { Schema, model, models } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema( 
    {
        name: { type: String, required: true },
        email: {
            type: String,
            unique: true,
            sparse: true,
            required: false, 
            match: [/.+@.+\..+/, "Invalid email format"]
        },
        phoneNumber: { type: [Number], required: true, unique: true },

        
        password: { type: String, required: true },
        address: { type: String, required: true },
        userType: { type: String, required: true, enum: ["customer", "admin"], default:"customer"},
        profileImage: { type: String, required: false }
        
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

const userModel = models.User || model('User', userSchema);

export default userModel;