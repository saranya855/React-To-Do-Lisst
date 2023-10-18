import React, { useState } from 'react';

function Task({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(task.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedText(task.text);
  };

  const handleUpdateClick = () => {
    onUpdate(task.id, updatedText);
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button className="bg-green-500 text-white p-2 rounded mr-2" onClick={handleUpdateClick}>
            Update
          </button>
          <button className="bg-gray-500 text-white p-2 rounded" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="text-xl font-semibold">{task.text}</div>
          <div className="text-gray-500">Created on: {new Date(task.createdOn).toLocaleDateString()}</div>
          <button className="bg-yellow-500 text-white p-2 rounded mr-2" onClick={handleEditClick}>
            Edit
          </button>
          <button className="bg-red-500 text-white p-2 rounded" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Task;
