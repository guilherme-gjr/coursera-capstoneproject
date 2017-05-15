var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// require("mongoose-currency").loadType(mongoose);
// var Currency = mongoose.Types.Currency;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }
}, {
    timestamps: true
});

var User = mongoose.model('User', userSchema);

module.exports = User;
