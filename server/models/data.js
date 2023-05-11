const {Schema , model} = require('mongoose');
const DataSchema = new Schema({
    
    x:{
        type: Number,
        required : true
    },
    y:{
        type : Number,
        required : true
    },
    key : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
})


const DataModel =  model('data', DataSchema)

module.exports = DataModel;