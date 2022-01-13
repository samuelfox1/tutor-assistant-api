import React, { useContext, useState } from 'react';
import { Button, Heading, Modal } from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../../context';
import { createModel, missingFormInputs } from '../../../utils';
import AddMeetingForm from './AddMeetingForm';

const AddMeetingModal = () => {
  const { openModal, setOpenModal } = useContext(ModalContext);
  const { allCourses, setAllCourses, selectedCourse } = useContext(CourseContext);
  const [formInputs, setFormInputs] = useState({
    duration: 1,
    startTime: '',
    status: 'scheduled',
    studentId: '',
  });

  const handleAddMeeting = async (e) => {
    e.preventDefault();

    const newMeeting = await createModel(
      {
        model: 'meeting',
        body: formInputs,
        _id: selectedCourse,
      },
    );

    const currentMeetings = allCourses[selectedCourse].meetings;
    const updatedCourse = {
      ...allCourses[selectedCourse],
      meetings: {
        ...currentMeetings,
        [newMeeting._id]: { ...newMeeting, type: 'tutorly' },
      },
    };
    setAllCourses({
      ...allCourses,
      [selectedCourse]: updatedCourse,
    });
    setOpenModal('');

    return '';
  };

  return (
    <Modal
      className='background-blurred-light'
      show={openModal === 'AddMeeting'}
      onClose={() => setOpenModal('')}
    >
      <Modal.Card>
        <Modal.Card.Header
          className='background-clear mx-2 pb-0'
          showClose={false}
        >
          <Heading className='has-text-grey-lighter mb-5'>
            Add Meeting
          </Heading>
        </Modal.Card.Header>

        <form onSubmit={handleAddMeeting}>
          <Modal.Card.Body>
            <AddMeetingForm
              formInputs={formInputs}
              setFormInputs={setFormInputs}
            />
          </Modal.Card.Body>
          <Modal.Card.Footer renderAs={Button.Group} align='right' hasAddons>
            <Button type='button' onClick={() => setOpenModal('')}>
              cancel
            </Button>
            <Button
              color='success'
              type='submit'
              disabled={missingFormInputs(formInputs)}
            >
              Add Meeting
            </Button>
          </Modal.Card.Footer>
        </form>
      </Modal.Card>
    </Modal>
  );
};
export default AddMeetingModal;
