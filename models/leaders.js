const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);


const leaderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type :String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Leader', leaderSchema);