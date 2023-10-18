import { getSession } from 'next-auth/react'; // Assuming you are using next-auth for authentication

export async function isUserAuthenticated() {
  const session = await getSession();
  return !!session;
}

export async function getUserSession() {
  const session = await getSession();
  return session;
}