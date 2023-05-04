const {Schema , model} = require('mongoose');
const UserSchema = new Schema({
    
    name:{
        type: String,
        required : true
    },
    age:{
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
})


const UserModel = model('users', UserSchema)

module.exports = UserModel;