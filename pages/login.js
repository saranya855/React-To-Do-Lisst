import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { getError } from '@/utils/error';
import { signIn, useSession } from 'next-auth/react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const session =useSession()
    // Assuming you are using next-auth for authentication
    if(session.status=='authenticated'){
      router.push('/dashboard')
    }
    const submitHandler = async () => {
        console.log('hello');
        try {
          const result = await signIn('credentials', {
            // redirect: false,
            email,
            password,
          });
          // if (result.error) {
          //   console.log(result.error);

          //   // toast.error(result.error);
          // }else{
            toast.success('User login successful');
            router.push('/dashboard')
          // }
        } catch (err) {
          toast.error(getError(err));
          console.log(getError(err));
        }
      };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm" >
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* <form onSubmit={handleSubmit} > */}
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Login</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              // type="submit"
              onClick={submitHandler}
            >
              Sign In
            </button>
            <Link href="/register" className="text-indigo-500 hover:underline">
            Register
          </Link>
          </div>
          </div>
        {/* </form> */}
        </div>
      </div>
  );
}

export default Login;
