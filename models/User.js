import mongoose, { mongo } from "mongoose";
const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        min: 2,
        max :50
    },
     lastName:{
        type: String,
        required:true,
        min: 2,
        max :50
    },
     email:{
        type: String,
        required:true,
        unique : true,
        max :50
    },
     password:{
        type: String,
        require:true,
        min: 5,
    },
     picturePath:{
        type: String,
        default: ""
    },
     friends:{
        type: Array,
        default: []
    },
    location : String,
    occupation : String,
    viewedProfile : Number,
    impressions : Number,
},{
    timestamps: true
});
const User = mongoose.model("User", UserSchema)
 export default User;