import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Item, apiUrl } from './types';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm';

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="wrapper">
        <ItemList items={items} fetchData={fetchData} />
      </div>

      <div className="formWrapper">
        <h1>Add Post</h1>
        <AddItemForm fetchData={fetchData} />
      </div>
    </div>
  );
};

export default App;