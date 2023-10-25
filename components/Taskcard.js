// import React from 'react';
// import Link from 'next/link';
// // const TaskCard = ({ task }) => {
// //   const { title, description, elaborations, important, urgent, due_date, status } = task;

// const TaskCard = ({ task, onDeleteTask }) => {
//   const { _id, title, description, elaborations, important, urgent, due_date, status } = task;

//   // Define a CSS class based on the task's status (completed or not)
  
//   // Define CSS classes for the importance and urgency icons
//   const importanceClass = important ? 'text-red-500' : 'text-gray-500';
//   const urgencyClass = urgent ? 'text-red-500' : 'text-gray-500';
//   const dueDateObj = new Date(due_date);
//   const currentDate = new Date();
//   const timeDifference = dueDateObj - currentDate;
//   const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
//   const statusClass = remainingDays<5&&remainingDays>0 ? 'bg-red-200' : 'bg-green-200';
//   return (
//     <div className={`rounded-lg shadow-lg p-4 ${statusClass}`}>
//       <div className="flex w-full">
//         <div className="w-1/2 text-2xl font-semibold mb-2">{title}
//         </div>
        
//         <Link className="text-indigo-500  bg-violet pl-24 hover:underline" as={`pages/api/tasks/delete/${_id}`} href={`pages/api/tasks/delete/[taskId]`}>
//                     Delete Task
//           </Link>
//         <div className="w-1/2 flex justify-end items-center">
//           {remainingDays<5&&remainingDays>0?(<h3 className={`${remainingDays<5&&remainingDays>0?('text-red-600 bg-red-200'):(' ' )} p-2 rounded-lg`}>{remainingDays}</h3>):('')}
//         </div>
//       </div>
//       <p className="text-gray-600 mb-4">{description}</p>
//       <p className="text-gray-600 mb-4">{elaborations}</p>
//       <div className="flex items-center space-x-2 mb-4">
//         <span className={`text-xl ${importanceClass}`}>
//           {important ? 'Important' : 'Not Important'}
//         </span>
//         <span className={`text-xl ${urgencyClass}`}>
//           {urgent ? 'Urgent' : 'Not Urgent'}
//         </span>
//       </div>
//       <p className="text-gray-600">
//         Due Date: {due_date}
//       </p>
//     </div>
//   );
// };

// export default TaskCard;





import React from 'react';
import Link from 'next/link';

const TaskCard = ({ task, onDeleteTask }) => {
  const { _id, title, description, elaborations, important, urgent, due_date, status } = task;

  const importanceClass = important ? 'text-red-500' : 'text-gray-500';
  const urgencyClass = urgent ? 'text-red-500' : 'text-gray-500';
  const dueDateObj = new Date(due_date);
  const currentDate = new Date();
  const timeDifference = dueDateObj - currentDate;
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const statusClass = remainingDays < 5 && remainingDays > 0 ? 'bg-red-200' : 'bg-green-200';

  return (
    <div className={`rounded-lg shadow-lg p-4 ${statusClass}`}>
      <div className="flex w-full">
        <div className="w-1/2 text-2xl font-semibold mb-2">{title}</div>
        <Link href={`/tasks/${_id}`}>
          Delete Task
        </Link>
        <div className="w-1/2 flex justify-end items-center">
          {remainingDays < 5 && remainingDays > 0 ? (
            <h3 className={`${remainingDays < 5 && remainingDays > 0 ? 'text-red-600 bg-red-200' : ' ' } p-2 rounded-lg`}>
              {remainingDays}
            </h3>
          ) : (
            ''
          )}
        </div>
      </div>
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
      <p className="text-gray-600">Due Date: {due_date}</p>
    </div>
  );
};

export default TaskCard;

