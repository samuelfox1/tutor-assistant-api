const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { getISOCurrentDateStamp } = require('../utils/dateTime');

const calendlySchema = new Schema({
  avatar_url: { type: String },
  created_at: { type: String },
  current_organization: { type: String },
  email: { type: String },
  name: { type: String },
  scheduling_url: { type: String },
  slug: { type: String },
  timezone: { type: String },
  updated_at: { type: String },
  uri: { type: String },
});

const tutorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  timeZoneName: {
    type: String,
    required: true,
  },
  githubUsername: {
    type: String,
  },
  calendlyLink: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
  emailTemplates: [{
    type: Schema.Types.ObjectId,
    ref: 'EmailTemplate',
  }],
  accessTokens: [{
    type: Schema.Types.ObjectId,
    ref: 'AccessToken',
  }],
  calendly: { type: calendlySchema },
  createdAt: {
    type: String,
    default: () => getISOCurrentDateStamp(),
  },
});

// eslint-disable-next-line func-names
tutorSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// eslint-disable-next-line func-names
tutorSchema.methods.isCorrectPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Tutor = model('Tutor', tutorSchema);

module.exports = Tutor;
