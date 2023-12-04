import React, { useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { ItemListProps, apiUrl } from '../types';
import EditModal from './EditModal';

const ItemList: React.FC<ItemListProps> = ({ items, fetchData }) => {
  const [editItemId, setEditItemId] = useState<number | null>(null);

  const removeItem = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const openEditModal = (id: number) => {
    setEditItemId(id);
  };

  const closeEditModal = () => {
    setEditItemId(null);
  };

  return (
    <div>
      <ul className="flex cards" id="js-list">
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <img className="card-img" src={item.imgLink} alt="" />
            <p>{item.description}</p>
            <p className="card-bottom">
                Posted by <strong style={{ fontWeight: 'bold' }}>{item.author}</strong>, {formatDistanceToNow(new Date(item.dateAdded), { addSuffix: true })}
            </p>
            <div className="buttons">
              <button className="button red" onClick={() => removeItem(item.id)}>
                Delete
              </button>
              <button className="button yellow" onClick={() => openEditModal(item.id)}>
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editItemId !== null && (
        <EditModal
          isOpen={true}
          onRequestClose={closeEditModal}
          itemId={editItemId}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default ItemList;