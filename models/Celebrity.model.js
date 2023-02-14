const { Schema, model } = require('mongoose');

const celebritySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true,
        default: 'unknown',
        enum: ['actor', 'author', 'comedian', 'influencer', 'musician', 'singer', 'socialite', 'unknown']
    },
    catchphrase: {
        type: String,
        required: true
    }
});

const Celebrity = model('Celebrity', celebritySchema);

module.exports = Celebrity;