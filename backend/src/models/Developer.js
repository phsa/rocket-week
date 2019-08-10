const { Schema, model } = require('mongoose');

const DeveloperSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    bio: String,
    avatar_address: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }]
}, {
    timestamps: true
});

module.exports = model('Developer', DeveloperSchema);