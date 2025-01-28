import React from 'react';

const RichTextViewer = ({ title, content }) => {
  return (
    <div className='rich-text' dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default RichTextViewer;
