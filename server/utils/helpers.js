const { Tutor, Student } = require('../models')


module.exports = {
    getTutorById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const tutor = await Tutor.findById(id)
                    .populate('students')
                    .populate('sessions');
                if (!tutor) reject('tutor not found')
                resolve(tutor)
            } catch (error) {
                reject(error)
            }
        })
    },
    getTutorByEmail: (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                const tutor = await Tutor.findOne({ email: email })
                    .populate('students')
                    .populate('sessions');
                if (!tutor) reject('tutor not found')
                resolve(tutor)
            } catch (error) {
                reject(error)
            }
        })
    },
    addModelToTutor: (tutorId, property, modelId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedTutor = await Tutor.findByIdAndUpdate(
                    tutorId,
                    { $addToSet: { [property]: modelId } },
                    // { new: true }
                )
                if (!updatedTutor) return reject('failed to update tutor')
                resolve(updatedTutor)
            } catch (error) {
                reject(error)
            }
        })
    },
    deleteStudentFromTutor: (tutorId, studentId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedTutor = await Tutor.findByIdAndUpdate(tutorId,
                    { $pullAll: { students: [studentId] } },
                    // { new: true }
                );
                if (!updatedTutor) return reject('failed to update tutor')
                await Student.findByIdAndDelete(studentId)
                resolve(updatedTutor)
            } catch (error) {
                reject(error)
            }
        })
    },
    updateDocumentProperties: (allowUpdate, currentDoc, newProps) => {
        for (const [key, value] of Object.entries(newProps)) {
            if (key === 'email' && currentDoc.email === newProps.email) continue
            if (allowUpdate[key]) currentDoc[key] = value
        }
    }
}