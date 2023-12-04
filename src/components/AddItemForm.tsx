import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl, AddItemFormProps } from '../types';

const AddItemForm: React.FC<AddItemFormProps> = ({ fetchData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [imgLink, setImgLink] = useState('');

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
  
        const newItem = {
          imgLink,
          author,
          title,
          description,
          dateAdded: formattedDate,
        };
  
        await axios.post(apiUrl, newItem);
        fetchData();
  
        setImgLink('');
        setAuthor('');
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error('Error adding item:', error);
      }
    };

    return (
        <form id="addEntryForm" onSubmit={handleAddItem}>
            <label htmlFor="imgLink">
                Image Link:
            </label>
            <input
                type="text"
                id="imgLink"
                name="imageLink"
                value={imgLink}
                onChange={(e) => setImgLink(e.target.value)}
                required
            />

            <label htmlFor="title">
                Title:
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <label htmlFor="description">
                Description:
            </label>
            <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required>
            </textarea>

            <label htmlFor="author">
                Author:
            </label>
            <input
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />

            <button type="submit" className="button green">
                Add Entry
            </button>
        </form>
      );
    };

export default AddItemForm;