import { arrayOf, func, string } from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ListFilterSelector from '../List/ListFilterSelector';

const MeetingsListFilter = ({
  sectionName, filterOptions, setFilterOptions, filterBy, setFilterBy,
}) => {
  const { calendlyMeetings } = useSelector((state) => state);

  useEffect(() => {
    let isMounted = true;
    const optionName = 'calendly';
    const hasItemsToFilter = (Object.keys(calendlyMeetings).length > 0);

    if (hasItemsToFilter) {
    /**
         * if there are items to display
         *  if already an option, return
         * add option
         */
      if (isMounted
      && !filterOptions.includes(optionName)
      ) setFilterOptions([...filterOptions, optionName]);
    } else if (filterOptions.includes(optionName)) {
    /*
        * if there are no items to display & option is included
        * remove option
        * update state
        */
      const removeCalendlyOption = filterOptions.filter((option) => option !== optionName);
      if (isMounted) setFilterOptions([...removeCalendlyOption]);
    }

    return () => { isMounted = false; };
  }, [calendlyMeetings, filterOptions, setFilterOptions]);

  return (
    <ListFilterSelector
      className='py-0 has-text-centered'
      sectionName={sectionName}
      filterOptions={filterOptions}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
    />
  );
};
export default MeetingsListFilter;

MeetingsListFilter.propTypes = {
  sectionName: string.isRequired,
  filterOptions: arrayOf(string).isRequired,
  setFilterOptions: func.isRequired,
  filterBy: string.isRequired,
  setFilterBy: func.isRequired,
};
