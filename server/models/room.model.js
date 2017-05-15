var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }
}, {
    timestamps: true
});

var Room = mongoose.model('Room', roomSchema);

module.exports = Room;
