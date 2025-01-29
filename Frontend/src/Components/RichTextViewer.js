import React from 'react';

const RichTextViewer = ({ content }) => {
  return (
    <div className='rich-text' dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default RichTextViewer;
