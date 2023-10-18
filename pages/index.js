import { useSession } from 'next-auth/react'; // Import the useSession hook
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import the router

export default function Home() {
  // const { data: session } = useSession(); // Get the user session
  // const router = useRouter();

  // if (session) {
  //   // If the user is authenticated, redirect to the dashboard or another page
  //   router.push('/dashboard');
  //   return null; // Render nothing in this component
  // }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Welcome to My To-Do App</h1>
        <p className="mt-4 text-gray-500">Organize your tasks easily.</p>
        <div className="mt-8 space-x-4">
          <Link href="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
          <span className="text-gray-500">or</span>
          <Link href="/register" className="text-indigo-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
