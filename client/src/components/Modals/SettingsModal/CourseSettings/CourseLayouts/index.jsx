import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Level } from 'react-bulma-components';
import { string, func } from 'prop-types';
import DeleteCourseLayout from './DeleteCourseLayout';
import EditCourseNameLayout from './EditCourseNameLayout';
import DefaultCourseLayout from './DefaultCourseLayout';

const CouseLayouts = ({
  courseName, courseId,
  courseToUpdate, setCourseToUpdate,
  courseToDelete, setCourseToDelete,
  handleDeleteCourse, handleUpdateCourse,
}) => {
  const [formInput, setFormInput] = useState('');
  const [layout, setLayout] = useState();

  const handleEditNameClick = useCallback(
    (name, id) => {
      setFormInput(name);
      setCourseToUpdate(id);
    },
    [setCourseToUpdate],
  );

  const handleUpdateClick = useCallback((e) => {
    e.preventDefault();
    handleUpdateCourse(courseId, formInput.trim());
    setFormInput('');
  }, [courseId, formInput, handleUpdateCourse]);

  const props = useMemo(() => ({
    courseId,
    courseName,
    formInput,
    setFormInput,
    setCourseToUpdate,
    setCourseToDelete,
    handleUpdateClick,
    handleEditNameClick,
    handleDeleteCourse,
  }), [
    courseId, courseName, formInput, setFormInput,
    setCourseToDelete, setCourseToUpdate,
    handleUpdateClick, handleEditNameClick,
    handleDeleteCourse,
  ]);

  const updateLayout = useCallback(() => {
    switch (courseId) {
    case courseToUpdate:
      return setLayout(<EditCourseNameLayout {...props} />);

    case courseToDelete:
      return setLayout(<DeleteCourseLayout {...props} />);

    default:
      return setLayout(<DefaultCourseLayout {...props} />);
    }
  }, [courseId, courseToUpdate, courseToDelete, props]);

  useEffect(
    updateLayout,
    [updateLayout, handleDeleteCourse, handleUpdateCourse],
  );

  return (
    <Level
      renderAs='div'
      className='is-mobile '
    >
      {layout}
    </Level>
  );
};
export default CouseLayouts;

CouseLayouts.propTypes = {
  courseName: string.isRequired,
  courseId: string.isRequired,
  courseToDelete: string.isRequired,
  setCourseToDelete: func.isRequired,
  courseToUpdate: string.isRequired,
  setCourseToUpdate: func.isRequired,
  handleUpdateCourse: func.isRequired,
  handleDeleteCourse: func.isRequired,
};
