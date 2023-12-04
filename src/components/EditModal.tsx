import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { apiUrl, EditModalProps } from '../types';

const EditModal: React.FC<EditModalProps> = ({ isOpen, onRequestClose, itemId, fetchData }) => {
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedAuthor, setEditedAuthor] = useState('');
    const [editedImgLink, setEditedImgLink] = useState('');
  
    const [editedDateAdded, setEditedDateAdded] = useState<string>(''); // string!!
  
    useEffect(() => {
      const fetchItemData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/${itemId}`);
          const existingItem = response.data;
  
          setEditedTitle(existingItem.title);
          setEditedDescription(existingItem.description);
          setEditedAuthor(existingItem.author);
          setEditedImgLink(existingItem.imgLink);
  
          setEditedDateAdded(new Date(existingItem.dateAdded).toISOString());
        } catch (error) {
          console.error('Error fetching item data:', error);
        }
      };
  
      fetchItemData();
    }, [itemId]);
  
    const handleSaveEdit = async () => {
      try {
        const updatedItem = {
          imgLink: editedImgLink,
          author: editedAuthor,
          title: editedTitle,
          description: editedDescription,
          dateAdded: editedDateAdded,
        };
  
        await axios.put(`${apiUrl}/${itemId}`, updatedItem);
  
        onRequestClose();
        fetchData();
      } catch (error) {
        console.error('Error editing item:', error);
      }
    };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit"
      className="modal"
    >
      <label htmlFor="editTitle">Title:</label>
      <input
        type="text"
        id="editTitle"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />

      <label htmlFor="editDescription">Description:</label>
      <textarea
        id="editDescription"
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      ></textarea>

      <label htmlFor="editAuthor">Author:</label>
      <input
        type="text"
        id="editAuthor"
        value={editedAuthor}
        onChange={(e) => setEditedAuthor(e.target.value)}
      />

      <label htmlFor="editImg">Image Link:</label>
      <input
        type="text"
        id="editImg"
        value={editedImgLink}
        onChange={(e) => setEditedImgLink(e.target.value)}
      />

      <div className="buttons">
        <button className="button green" onClick={handleSaveEdit}>
          Save
        </button>
        <button className="button red" onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;