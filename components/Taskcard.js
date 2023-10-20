import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';

const TaskCard = ({ task }) => {

  const { title, description, elaborations, important, urgent, due_date, status } = task;

  // Define a CSS class based on the task's status (completed or not)
  
  const router =useRouter();

  // Define CSS classes for the importance and urgency icons
  const importanceClass = important ? 'text-red-500' : 'text-gray-500';
  const urgencyClass = urgent ? 'text-red-500' : 'text-gray-500';
  const dueDateObj = new Date(due_date);
  const currentDate = new Date();
  const timeDifference = dueDateObj - currentDate;
  const remainingDays = Math.ceil(timeDifference / (1000 * 60*  60 * 24));
  const statusClass = remainingDays<5&&remainingDays>0 ? 'bg-red-200' : 'bg-green-200';

  const deleteTask = async () => {
    try {
        const response = await axios.post('/api/tasks/delete',{task_id:task._id});
        toast.success('Task deleted successfully')
        router.reload()
        return response.data; // The newly created task
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
    // console.log(formData);
  };
  return (
    <div className={`rounded-lg shadow-lg p-4 ${statusClass}`}>
      <div className="flex w-full">
        <div className="w-1/2 text-2xl font-semibold mb-2">{title}
        </div>
        <div className="w-1/2 flex justify-end items-center">
          {remainingDays<5&&remainingDays>0?(<h3 className={`${remainingDays<5&&remainingDays>0?('text-red-600 bg-red-200'):(
' ' )} p-2 rounded-lg`}>{remainingDays}</h3>):('')}
        </div>
      </div>
      <button className="bg-violet-500 text-white p-2 rounded-md " onClick={deleteTask} >delete</button>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-gray-600 mb-4">{elaborations}</p>
      <div className="flex items-center space-x-2 mb-4">
        <span className={`text-xl ${importanceClass}`}>
          {important ? 'Important' : 'Not Important'}
        </span>
        <span className={`text-xl ${urgencyClass}`}>
          {urgent ? 'Urgent' : 'Not Urgent'}
        </span>
      </div>
      <p className="text-gray-600">
        Due Date: {due_date}
      </p>
    </div>
  );
};

export default TaskCard;