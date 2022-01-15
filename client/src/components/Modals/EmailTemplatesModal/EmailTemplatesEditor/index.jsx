import React, { useContext, useState } from 'react';
import { Button, Columns } from 'react-bulma-components';

import { EmailTemplatesContext } from '../EmailTemplatesProvider';
import Editor from './Editor';
import EditorPreview from './EditorPreview';

const EmailTemplatesEditor = () => {
  const { displayComponent, setDisplayComponent } = useContext(EmailTemplatesContext);
  const [viewPreview, setViewPreview] = useState(false);

  if (displayComponent !== 'EmailTemplatesEditor') return '';

  return (
    <div className='px-3'>
      <Columns
        vCentered
        className='is-mobile border-bottom-light mx-0 mt-1 '
      >
        <Columns.Column className='pl-0 pb-2'>
          <Button
            color='warning'
            className='tag'
            onClick={() => setDisplayComponent('default')}
          >
            <i className='fas fa-chevron-left' />
          </Button>
        </Columns.Column>

        <Columns.Column
          textAlign='center'
          renderAs='h1'
          className='is-size-5 has-text-weight-bold pb-0'
        >
          Editor
        </Columns.Column>
        <Columns.Column
          className='pb-2 pr-0'
          display='flex'
          justifyContent='end'
        >
          <Button
            color='warning'
            className='tag'
            onClick={() => setViewPreview((current) => !current)}
          >
            preview
          </Button>
        </Columns.Column>
      </Columns>
      {viewPreview
        ? <EditorPreview />
        : <Editor /> }
    </div>
  );
};

export default EmailTemplatesEditor;
