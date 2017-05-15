var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var memberSchema = new Schema({
    user: {
        type: Schema.ObjectId, 
        ref : 'User',
        required: true
    },
    role: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    canCreateTask: {
        type: Boolean,
        default: false
    },
    canEditTask: {
        type: Boolean,
        default: false
    },
    canCreateRoom: {
        type: Boolean,
        default: false
    },
    canEditRoom: {
        type: Boolean,
        default: false
    },
    canAddMembers: {
        type: Boolean,
        default: false
    },
    canEditMember: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var Members = mongoose.model('Member', memberSchema);

module.exports = Members;
