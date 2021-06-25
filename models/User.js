const mongoose = require ('mongoose');
const userSchema = mongoose.Schema({
    name:
    {type:String,
    required:true
    },
    email:String,
    age:String,
    phone:String,
})

module.exports = mongoose.model('User', userSchema);