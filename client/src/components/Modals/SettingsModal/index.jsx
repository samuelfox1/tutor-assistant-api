import React, {
  useState, useContext, useEffect, useCallback,
} from 'react';
import {
  Button, Heading, Modal, Tabs,
} from 'react-bulma-components';
import { ModalContext } from '../../../context';
import CourseSettings from './CourseSettings';
import ProfileDetailList from './ProfileDetailList';

const SettingsModal = () => {
  const [disableControls, setDisableControls] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [component, setComponent] = useState('');

  const { openModal, setOpenModal } = useContext(ModalContext);

  const handleUpdate = useCallback(
    (e, courseName) => {
      const {
        target: {
          parentNode: { parentNode: { classList } },
        },
      } = e;

      // if selected tab is already active, return
      if (classList.contains('is-active')) return '';

      // // toggle current active tab off
      document
        .querySelector('#settings-tabs ul li.is-active')
        .classList.toggle('is-active');

      // // toggle new tab on
      classList.toggle('is-active');
      setActiveTab(courseName);
      return '';
    },
    [],
  );

  useEffect(() => {
    let isMounted = true;
    switch (activeTab) {
    case 'profile':
      if (isMounted) return setComponent(
        <ProfileDetailList />,
      );
      break;
    case 'courses':
      if (isMounted) return setComponent(
        <CourseSettings setDisableControls={setDisableControls} />,
      );
      break;

    case 'students':
      if (isMounted) return setComponent(
        <h1>Students</h1>,
      );
      break;

    case 'meetings':
      if (isMounted) return setComponent(
        <h1>Meetings</h1>,
      );
      break;

    default:
      if (isMounted) return console.warn('no component selected');
      break;
    }

    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  return (
    <Modal
      className='background-blurred-light'
      showClose={!disableControls}
      show={openModal === 'settings'}
      onClose={() => setOpenModal('')}
    >
      <Modal.Card>
        <Modal.Card.Header
          flexDirection='column'
          alignItems='start'
          className='background-clear mx-2 pb-0'
          showClose={false}
        >
          <Heading
            className='has-text-grey-lighter'
          >
            Settings
          </Heading>

          <Tabs
            align='left'
            type='boxed'
            id='settings-tabs'
          >
            <Tabs.Tab
              className='rounded-top'
              active={activeTab === 'profile'}
              onClick={(e) => handleUpdate(e, 'profile')}
            >
              <strong
                className={activeTab !== 'profile' ? 'has-text-grey-lighter' : ''}
              >
                Profile
              </strong>
            </Tabs.Tab>
            <Tabs.Tab
              className='rounded-top'
              active={activeTab === 'courses'}
              onClick={(e) => handleUpdate(e, 'courses')}
            >
              <strong
                className={activeTab !== 'courses' ? 'has-text-grey-lighter' : ''}
              >
                Courses
              </strong>
            </Tabs.Tab>
            {/* <Tabs.Tab
              className='rounded-top'
              active={activeTab === 'students'}
              onClick={(e) => handleUpdate(e, 'students')}
            >
              <strong
                className={activeTab !== 'students' ? 'has-text-grey-lighter' : ''}
              >
                Students
              </strong>
            </Tabs.Tab> */}
            {/* <Tabs.Tab
              className='rounded-top'
              active={activeTab === 'meetings'}
              onClick={(e) => handleUpdate(e, 'meetings')}
            >
              <strong
                className={activeTab !== 'meetings' ? 'has-text-grey-lighter' : ''}
              >
                Meetings
              </strong>
            </Tabs.Tab> */}
          </Tabs>
        </Modal.Card.Header>
        <Modal.Card.Body className='rounded-top'>
          {component}
        </Modal.Card.Body>
        <Button
          className='square-top'
          fullwidth
          color='primary'
          disabled={disableControls}
          onClick={() => setOpenModal('')}
        >
          Done
        </Button>
      </Modal.Card>
    </Modal>
  );
};
export default SettingsModal;
