import { getSession, useSession } from 'next-auth/react'; // Assuming you are using next-auth for authentication
import Link from 'next/link';
import TaskList from '../components/TaskList';
import Layout from '@/components/Layout';
import db from '@/backend/db';
import { Task } from '@/utils/db';
import TaskCard from '@/components/Taskcard';

function Dashboard({ tasks, userId }) {
  // Retrieve user session information
  const { data: session } = useSession();

  if (!session) {
    // If the user is not authenticated, you can redirect to the login page or handle it accordingly
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">You are not authenticated. Please log in.</p>
          <Link className="text-indigo-500 hover:underline" href="/login">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header>

      </header>
      <main>
        {/* <TaskList /> */}
        <Layout>
          <h1 className="text-3xl  text-gray-900 pl-24 font-bold pb-10 pt-20" >Welcome, {session.user.name}</h1>
          <Link className="text-indigo-500  bg-violet pl-24 hover:underline" href="/tasks/add">
            Add Task
          </Link>
          <div className='p-24 grid grid-flow-col grid-row-2 gap-7 overflow-scroll sc '>

            {tasks.map((task) => (
              <>

                <TaskCard key={task._id} task={task} />
              </>

            ))}
        
          </div>
          <h1 className="text-3xl pl-24 font-bold pb-10 pt-20">Urgent</h1>
        <div className='pl-24 grid grid-flow-row grid-cols-2 gap-7'>

            {tasks.map((task) => (
              <>

                <TaskCard key={task._id} task={task} />
              </>

            ))}
          </div>

        </Layout>
      </main>
    </div>
  );
}

export default Dashboard;
export async function getServerSideProps(context) {
  // Fetch task data using the getTasks function
  const session = await getSession(context)
  console.log(session);
  await db.connect();
  const tasks = await Task.find({ userId: session.user._id }).exec();
  console.log(tasks)
  await db.disconnect();
  return {
    props: { tasks: JSON.parse(JSON.stringify(tasks)), userId: session.user._id },


  };
}