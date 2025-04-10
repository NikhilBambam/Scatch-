
const config = require('config');
const mongoose = require('mongoose');

const mongoURI = config.get('MONGODB_URI');

mongoose.connect(mongoURI)
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const userSchema = mongoose.Schema({
    fullname : {
        type:String,
        minlength:3,
        trim:true,
    },
    email : String,
    password:String,
    cart : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
    }],
    isadmin : Boolean,
    orders:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture:String
});

module.exports = mongoose.model('user',userSchema);