var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// require("mongoose-currency").loadType(mongoose);
// var Currency = mongoose.Types.Currency;

var familySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
}, {
    timestamps: true
});

var Families = mongoose.model('Family', familySchema);

module.exports.Schema = familySchema;
module.exports = Families;
