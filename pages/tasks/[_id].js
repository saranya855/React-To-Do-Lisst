
import TaskCard from '@/components/Taskcard';
import { useRouter } from 'next/router';

const DeleteTaskPage = () => {
  const router = useRouter();
  const { _id } = router.query;
 
  const handleDeleteTask = async () => {
    try {
      console.log('Deleting task with taskId:', _id);

      const response = await fetch(`/api/tasks/delete/${_id}`, {
        method: 'DELETE',
      });

      console.log('Delete Task API response:', response);

      if (response.status === 204) {
        router.push('/tasks'); // Redirect to the task list page after deletion
      } else {
        // Handle errors
        console.error('Error deleting task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Delete Task</h1>
      <p>Are you sure you want to delete this task?</p>
      <button onClick={handleDeleteTask}>Delete</button>
      <button onClick={() => router.push('/tasks')}>Cancel</button>
    </div>
  );
};

export default DeleteTaskPage;
