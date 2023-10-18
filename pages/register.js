import { useState } from 'react';
import { useRouter } from 'next/router';
import { signUp } from 'next-auth'; // Assuming you are using next-auth for authentication
import Link from 'next/link';
import toast from 'react-hot-toast';
import { getError } from '@/utils/error';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const submit=async ()=>{
    try{
      const {data} = await axios.post('/api/auth/register', { 'name':name,'email':email,'password':password})
      if(data.status){
        toast.success(data.message)
        setTimeout(() => {
          router.push('/login  ')
        }, 5000);
        
      }else{
        toast.error(data.message)
      }
    }catch(e){
        toast.error(getError(e))
      }

  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* <form onSubmit={submit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> */}
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Register</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              onClick={submit}
            >
              Register
            </button>
            <Link href="/login" className="text-indigo-500 hover:underline">
            login
          </Link>
          </div>
          </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export default Register;
