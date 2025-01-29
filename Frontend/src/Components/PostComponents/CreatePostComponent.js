import React, { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import JoditEditor from 'jodit-react';
import { config, joditConfig } from '../../joditConfig';
import { createPost } from '../../features/Post/PostAction';
import { uploadImage } from '../../features/Media/MediaAction';
import { imageUrlState } from '../../features/Media/MediaSlice';
import { allCategoriesState } from '../../features/Post/PostSlice';

const CreatePostComponent = () => {
  const dispatch = useDispatch();

  const allCategoriesData = useSelector(allCategoriesState);

  const [newCategory, setNewCategory] = useState('');

  // # Jodit-react Set up
  const editor1 = useRef(null);
  const editor2 = useRef(null);

  // # To Remove copyright POWERED BY JODIT
  const editorRef = useRef(null);

  const removePoweredBy = () => {
    const editor = editorRef.current;
    if (editor) {
      const poweredBy = document.querySelector('.jodit-status-bar__item-right');
      if (poweredBy) {
        poweredBy.remove();
      }
    }
  };

  // % State For All Input Variable
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const uploadImageUrl = useSelector(imageUrlState);

  // % Handle Image Upload
  const [file, setFile] = useState(null); // Store the selected file

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    dispatch(uploadImage(formData));
  };

  // % Handle Publish Post
  const handlePublishPost = () => {
    const post = {
      title,
      subTitle,
      category,
      content,
      media: uploadImageUrl,
    };

    console.log('Publishing Post: ', post);

    dispatch(createPost(post));
    setTitle('');
    setSubTitle('');
    setCategory('');
    setContent('');
    setFile(null);
  };

  return (
    <div className='flex flex-col lg:flex-row md:flex-worp gap-6 px-8 py-4 mb-3'>
      {/* Input Fields Panel */}
      <div className='w-full border rounded-lg p-6 bg-gray-300 dark:bg-gray-800'>
        <h2 className='text-2xl font-bold mb-4'>Create Post</h2>

        {/* Title */}
        <div className='my-2 p-2 border-1 border-gray-500 rounded-md'>
          <label
            htmlFor='title'
            className='block text-xl text-green-600 font-extrabold dark:text-green-400'
          >
            Title
          </label>
          <JoditEditor
            ref={editor1}
            config={config}
            value={title}
            onBlur={removePoweredBy} // Triggered when the editor loads
            onChange={(newContent) => setTitle(newContent)} // Triggered when the user types something
            className='text-gray-900 bg-red-400'
          />
        </div>
        {/* Subtitle */}
        <div className='my-2 p-1 border-1 border-gray-500 rounded-md'>
          <label
            htmlFor='subTitle'
            className='block text-xl text-green-600 font-extrabold dark:text-green-400'
          >
            Subtitle
          </label>
          <input
            type='text'
            id='subTitle'
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className='mt-1 mb-4 w-full border-gray-300 rounded-md text-gray-900'
            placeholder='Enter the subtitle'
          />
        </div>
        {/* Category */}

        <div className='my-2 p-2 border-1 border-gray-500 rounded-md'>
          <label
            htmlFor='category'
            className='block text-xl text-green-600 font-extrabold dark:text-green-400'
          >
            Category
          </label>

          {/* Select Dropdown for Categories */}
          <select
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='mt-1 mb-4 w-full border-gray-300 rounded-md text-gray-900'
          >
            <option value=''>Select Category</option>
            {allCategoriesData.map((cat, ind) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value='add-new'>Add New Category</option>
          </select>

          {/* Input for Adding New Category */}
          {category === 'add-new' && (
            <div className='mt-4'>
              <label
                htmlFor='newCategory'
                className='block text-lg text-gray-600 dark:text-gray-400'
              >
                Add New Category
              </label>
              <input
                type='text'
                id='newCategory'
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className='mt-1 w-full p-2 border border-gray-300 rounded-md text-gray-900'
                placeholder='Enter new category'
              />
              <button
                type='button'
                onClick={() => {
                  if (newCategory && !allCategoriesData.includes(newCategory)) {
                    setCategory(newCategory);
                    setNewCategory('');
                  } else {
                    alert('Category already exists or is invalid!');
                  }
                }}
                className='mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700'
              >
                Add Category
              </button>
            </div>
          )}
        </div>

        {/* Content Editor */}
        <div className='my-2 p-2 border-1 border-gray-500 rounded-md'>
          <label
            htmlFor='content'
            className='block text-xl text-green-600 font-extrabold dark:text-green-400'
          >
            Content
          </label>
          <div className='border rounded-md'>
            <JoditEditor
              ref={editor2}
              config={joditConfig}
              value={content}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
        </div>
        {/* Media Upload */}
        <div className='my-2 p-2 border-1 border-gray-500 rounded-md'>
          <label
            htmlFor='media'
            className='block text-xl text-green-600 font-extrabold dark:text-green-400'
          >
            Upload Media
          </label>
          <input
            type='file'
            id='media'
            accept='image/*'
            onChange={handleFileChange}
            className='mt-1 mb-4 text-gray-900'
          />

          <button
            onClick={handleUpload}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Upload Image
          </button>
        </div>
        {uploadImageUrl && (
          <div className='mt-4'>
            <p>Uploaded Image:</p>
            <img
              src={`./uploads/` + uploadImageUrl}
              alt='Uploaded'
              className='w-48 h-48 object-cover mt-2'
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handlePublishPost}
          className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600'
        >
          Publish Post
        </button>
      </div>

      {/* Preview Panel */}
      <div className='w-full lg:w-1/2 border rounded-lg p-6 bg-gray-50 dark:bg-gray-700'>
        <h2 className='text-2xl font-bold mb-4'>Post Preview</h2>
        {/* Post Title */}
        <h3 className='text-lg font-bold'>{title || 'Post Title'}</h3>
        {/* Post Subtitle */}
        <p className='text-gray-700 dark:text-gray-300'>
          {subTitle || 'Subtitle goes here...'}
        </p>
        {/* Post Category */}
        <p className='text-sm text-gray-600 dark:text-gray-400 italic'>
          {category || 'Category'}
        </p>
        {/* Post Media */}
        {uploadImageUrl && (
          <img
            src={`./uploads/` + uploadImageUrl}
            alt='Uploaded Media'
            className='mt-4 rounded-md'
          />
        )}
        {/* Post Content */}
        <div
          className='prose dark:prose-dark'
          dangerouslySetInnerHTML={{
            __html: content || 'Post content will appear here...',
          }}
        ></div>
      </div>
    </div>
  );
};

export default CreatePostComponent;
