import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ReactQuill default theme
import { FaImage, FaPaperPlane } from 'react-icons/fa';
import { createPost } from '../../features/Post/PostAction';

const CreatePostComponent = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState('');

  const handleSubmit = () => {
    if (!title || !subTitle || !content) {
      alert('Title, subtitle, and content are required!');
      return;
    }

    const postData = { title, subTitle, content, media };
    dispatch(createPost(postData));

    // Clear fields after submit
    setTitle('');
    setSubTitle('');
    setContent('');
    setMedia('');
  };

  return (
    <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-3xl mx-auto space-y-6'>
      <h1 className='text-2xl font-bold text-center text-gray-700'>
        Create a Post
      </h1>

      <input
        type='text'
        className='w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-400'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type='text'
        className='w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-400'
        placeholder='Subtitle'
        value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
      />

      <ReactQuill
        value={content}
        onChange={setContent}
        placeholder='Write your content here...'
        className='bg-white h-52'
        modules={{
          toolbar: [
            [{ font: [] }, { size: [] }],
            [{ align: [] }],
            ['bold', 'italic', 'underline'],
            [{ color: [] }, { background: [] }],
          ],
        }}
      />

      <div className='flex items-center gap-4'>
        <input
          type='url'
          className='w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-400'
          placeholder='Image URL'
          value={media}
          onChange={(e) => setMedia(e.target.value)}
        />
        <FaImage className='text-blue-500' size={24} />
      </div>

      <button
        className='w-full py-3 px-6 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md flex items-center justify-center gap-2'
        onClick={handleSubmit}
      >
        <FaPaperPlane size={20} />
        Post
      </button>
    </div>
  );
};

export default CreatePostComponent;
