import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/backend/db';
import { getError } from '@/utils/error';
import { User } from '@/utils/db';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      // if (token?._id) session.user.name = token.name;
    //  console.log(session);

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        console.log(credentials.email);
        const user = await User.findOne({ email: credentials.email }); // Use findOne to find a user by email
        console.log(user);
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            email: user.email,
            name:user.name
            
          };
        }
     
        throw new Error('Incorrect email or password');
      
      },
    }),
  ],
});