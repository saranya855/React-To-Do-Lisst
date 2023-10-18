import React, { useState } from 'react';
import Layout from './Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function TaskForm({ initialData, onSubmit,userId }) {
  const [formData, setFormData] = useState({
    userId:userId,
    title: '',
    description: '',
    elaborations: '',
    important: false,
    urgent: false,
    due_date: '',
    status: true,
  });
  const createTask = async () => {
    try {
      console.log(formData);

      if (!formData.title || !formData.description|| !formData.elaborations  || !formData.due_date) {
        toast.error('Please fill in all required fields.');
      }else{
        // setFormData({...formData,userId:session.data.user._id})

        const response = await axios.post('/api/tasks/create', formData);
        toast.success('Task created successfully')
        return response.data; // The newly created task
      }
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
    // console.log(formData);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  return (
    <div className="flex justify-center content-center dark:text-black dark:bg-white p-5 w-full">
    {/* <form className="max-w-md mx-auto" onSubmit={handleSubmit}> */}
    <div className="w-full">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 ">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 "
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="elaborations" className="block text-gray-700">Elaborations:</label>
        <textarea
          id="elaborations"
          name="elaborations"
          value={formData.elaborations}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Important:</label>
        <input
          type="checkbox"
          id="important"
          name="important"
          checked={formData.important}
          onChange={handleChange}
          className="mr-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Urgent:</label>
        <input
          type="checkbox"
          id="urgent"
          name="urgent"
          checked={formData.urgent}
          onChange={handleChange}
          className="mr-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="due_date" className="block text-gray-700">Due Date:</label>
        <input
          type="date"
          id="due_date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <button
        // type="submit"
        onClick={createTask}
        className="bg-indigo-500 text-white p-2 rounded mt-2"
      >
        Add Task
      </button>
      </div>
    {/* </form> */}
    </div>
  );
}

export default TaskForm;
