const { Schema, model } = require('mongoose');

const templateSchema = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    templateFor: {
        type: String,
        default: 'new-student'
        // options: new-student, reassignment, one-time-stand-in, session-confirmation, time-card-correction
    },
    template: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: () => Math.floor(new Date().getTime() / 1000), // unix timestamp https://www.epochconverter.com/ 
        // get: (timestamp) => dateFormat(timestamp),
    }
});

const Template = model('Template', templateSchema);

module.exports = Template;