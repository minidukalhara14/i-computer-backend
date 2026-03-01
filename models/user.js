import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email : {
            type: String,
            required: true, 
            unique: true
        },
        //email : String

        firstName: {
            type: String,
            required: true,
            unique: false
        },

        lastName: {
            type: String,
            required: true,
            unique: false
        },
        password: {
            type: String,
            required: true
        },

        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },

        isblocked: {
            type: Boolean,
            required: true,
            default: false
        },
        isEmailVerified: {
            type: Boolean,
            required: true,
            default: false
        },
        image:{
            type: String,
            default : "/images/defaultProfile.png"
        }


    }
)

const User = mongoose.model("User", userSchema);

export default User;