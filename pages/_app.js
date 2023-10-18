import { Provider, useSession } from 'next-auth/react'; // Import your authentication provider
import { SessionProvider } from 'next-auth/react'; // Import your session provider
import '../styles/tailwind.css'; // Import your Tailwind CSS styles
import '../styles/globals.css'; // Import global styles
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps }  }) {
  return (
    <>
      <Toaster  position="top-right" toastOptions={{
    style: {
      marginTop: '60px',
    },
  }} reverseOrder={false}/>
    <SessionProvider session={session}>
    {Component.auth ? (

    <Auth >
      <Component {...pageProps} />
      </Auth>):(      <Component {...pageProps} />
)}
      </SessionProvider>
    </>
  );
}

export default MyApp;
function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // router.push('/common/unauthorized?message=login required');
      toast.error('Login to continue')
      router.push('/login')
      
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}
