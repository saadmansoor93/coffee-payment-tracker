import React, { useState } from 'react';

const AddCoworker = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCoworker, setNewCoworker] = useState({
    name: '',
    drink: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCoworker({
      ...newCoworker,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newCoworker.name || !newCoworker.drink || !newCoworker.price) {
      alert('Please fill in all fields');
      return;
    }
    
    onAdd(newCoworker);
    setNewCoworker({ name: '', drink: '', price: '' });
    setIsAdding(false);
  };

  return (
    <div className="mt-6">
      {isAdding ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-3">Add New Coworker</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={newCoworker.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Drink:</label>
              <input
                type="text"
                name="drink"
                value={newCoworker.drink}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Price:</label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={newCoworker.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Coworker
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        >
          Add New Coworker
        </button>
      )}
    </div>
  );
};

export default AddCoworker;