
require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.jtrcpad.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0`;


mongoose.connect(MONGODB_URI)
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