var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var taskSchema = new Schema({
    createdBy: {
        type: Schema.ObjectId, 
        ref : 'Member',
        required: true
    },
    assignedTo: {
        type: Schema.ObjectId,
        ref: 'Member',
        default: null
    },
    room: {
        type: Schema.ObjectId,
        ref: 'Room',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    reward: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date
    },
    completedDate: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var Tasks = mongoose.model('Task', taskSchema);

module.exports = Tasks;
