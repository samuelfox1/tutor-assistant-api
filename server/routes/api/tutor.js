const router = require('express').Router();
const { Tutor } = require('../../models');
const { signToken, authorizeToken } = require('../../utils/auth');
const { getCalendlyEvents } = require('../../utils/calendly-helpers');
const { encryptToken } = require('../../utils/encryption');
const {
  updateDocumentProperties, getTutorByEmail, getTutorById,
} = require('../../utils/helpers');

// create a new tutor
router.post('/', async ({ body }, res) => {
  try {
    const tutor = await Tutor.create(body);
    const { _id, password, email } = tutor;
    const accountKey = encryptToken(password, process.env.JWT_SECRET);
    const token = signToken({ _id, email, accountKey });

    tutor.password = null;
    return res.json({ token, tutor });
  } catch (error) {
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }
});

// login tutor with email and password
router.post('/login', async ({ body: { email, password } }, res) => {
  try {
    const { tutor } = await getTutorByEmail(email);
    if (!tutor) return res.status(401).json('unauthorized');

    if (!await tutor.isCorrectPassword(password)) return res.status(401).json('unauthorized');

    // store encrypted password to access a users encrypted api keys
    const accountKey = encryptToken(password, process.env.JWT_SECRET);
    const { _id, calendly } = tutor;
    const token = signToken({ _id, email, accountKey });
    tutor.password = null;

    if (calendly?.uri) {
      const { uri } = calendly;
      const calendlyMeetings = await getCalendlyEvents({ _id, accountKey, uri });
      return res.json({ token, tutor, calendlyMeetings });
    }

    return res.json({ token, tutor });
  } catch (error) {
    return res.status(401).json({
      location: 1,
      message: error.message,
    });
  }
});

// login tutor with token
router.get('/login', authorizeToken, async ({ tutor: { _id, accountKey } }, res) => {
  try {
    const { tutor } = await getTutorById(_id);
    if (!tutor) return res.status(401).json('unauthorized');

    const { email, calendly } = tutor;
    const token = signToken({ _id, email, accountKey });

    if (calendly?.uri) {
      const { uri } = calendly;
      const calendlyMeetings = await getCalendlyEvents({ _id, accountKey, uri });
      return res.json({ token, tutor, calendlyMeetings });
    }

    return res.json({ token, tutor });
  } catch (error) {
    return res.status(401).json({
      location: 1,
      message: error.message,
    });
  }
});

// allow a tutor to update their personal data
router.put('/', authorizeToken, async ({ tutor: { _id }, body }, res) => {
  try {
    const tutorDoc = await Tutor.findById(_id);
    // config for properties allowed to update
    const allowUpdate = {
      firstName: true,
      lasName: true,
      email: true,
      timeZoneName: true,
      githubUsername: true,
      calendlyLink: true,
      meetingCount: true,
      password: false,
      courses: false,
      students: false,
      meetings: false,
      createdAt: false,
    };
    updateDocumentProperties(allowUpdate, tutorDoc, body);
    // save the updated document using the .save() method
    // https://mongoosejs.com/docs/documents.html#updating-using-queries
    const updated = await tutorDoc.save();

    if (!updated) return res.status(500).json('failed to update');
    return res.json('tutor updated');
  } catch (error) {
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }
});

// update a tutors password
router.put('/password', authorizeToken, async ({ tutor: { _id }, body }, res) => {
  try {
    const tutorDoc = await getTutorById(_id);
    if (!await tutorDoc.isCorrectPassword(body.password)) return res.status(401).json('unauthorized');

    // update password to overwrite
    tutorDoc.password = body.newPassword;
    const updated = await tutorDoc.save();
    if (!updated) return res.status(500).json('failed to update');
    return res.json('password updated');
  } catch (error) {
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }
});

// delete tutor
router.delete('/', authorizeToken, async ({ tutor: { _id }, body }, res) => {
  try {
    const tutorDoc = await getTutorById(_id);
    if (!await tutorDoc.isCorrectPassword(body.password)) return res.status(401).json('unauthorized');
    await Tutor.findByIdAndDelete(_id);
    return res.json('tutor deleted');
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      location: 1,
      message: error.message,
    });
  }
});

module.exports = router;
