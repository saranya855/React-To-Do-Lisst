import { useSession } from 'next-auth/react'; // Assuming you are using next-auth for authentication
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import TaskForm from '../../components/TaskForm';

function EditTask() {
  // Retrieve user session information
  const { data: session } = useSession();
  const router = useRouter();
  const { taskId } = router.query;
  const [task, setTask] = useState(null);

  useEffect(() => {
    // Fetch the task with the provided taskId from your database
    if (taskId) {
      // Implement the logic to fetch the task based on the taskId
      // You can use an API route to handle this task retrieval

      // For example, you can use a fetch request to an API route like /api/tasks/update/[taskId]
      fetch(`/api/tasks/update/${taskId}`)
        .then((response) => response.json())
        .then((data) => setTask(data))
        .catch((error) => console.error('Error fetching task:', error));
    }
  }, [taskId]);

  if (!session) {
    // If the user is not authenticated, you can redirect to the login page or handle it accordingly
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">You are not authenticated. Please log in.</p>
          <Link href="/login">
            <a className="text-indigo-500 hover:underline">Login</a>
          </Link>
        </div>
      </div>
    );
  }

  const handleTaskSubmit = async (taskData) => {
    // Implement the logic to update the task in your database here
    // You can use API routes to handle the task update

    // For example, you can use a fetch request to an API route like /api/tasks/update/[taskId]
    const response = await fetch(`/api/tasks/update/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      router.push('/tasks'); // Redirect to the tasks list after successful task update
    } else {
      // Handle the case where the task update failed
      console.error('Task update failed.');
    }
  };

  return (
    <div>
      <header>
        <h1 className="text-3xl font-extrabold text-gray-900">Edit Task</h1>
      </header>
      <main>
        {task ? (
          <TaskForm initialData={task} onSubmit={handleTaskSubmit} />
        ) : (
          <p>Loading task data...</p>
        )}
      </main>
    </div>
  );
}

export default EditTask;
