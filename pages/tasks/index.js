import { useSession, getSession } from 'next-auth/react'; // Assuming you are using next-auth for authentication
import TaskList from '../../../components/TaskList';

function Tasks() {
  // Retrieve user session information
  const { data: session } = useSession();

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

  return (
    <div>
      <header>
        <h1 className="text-3xl font-extrabold text-gray-900">My Tasks</h1>
      </header>
      <main>
        <TaskList userId={session.user.id} />
      </main>
    </div>
  );
}

export default Tasks;
