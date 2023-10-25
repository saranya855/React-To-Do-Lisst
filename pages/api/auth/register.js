import bcryptjs from 'bcryptjs';
import { User } from '@/utils/db';

import { getSession } from 'next-auth/react';
import { getError } from '../../../utils/error';
import db from '@/backend/db';
async function handler(req, res) {
  
  // Create a new user
  if (req.method === 'POST')
   {
        const { name, email, password} = req.body;
        //server side validation
        if (!name ||!email ||!email.includes('@') ||!password ||password.trim().length < 5) 
        {
          res.status(422).json({message: 'Validation error',});
          return;
        }
        try
        {
          await db.connect();
          //if user exist

          const existingUser = await User.findOne({ email: email });
          if (existingUser) {
            res.status(422).json({ message: `User with email ${email}   already exists!`,status:false });
            await db.disconnect();
            return;
          }
        //creating new user
          const newUser = new User({
            name, 
            email,
            password: bcryptjs.hashSync(password),
            status:true,
          });

          const user = await newUser.save();
          await db.disconnect();
          res.send({message: `User Created !`,status:true});
      }catch(e){
          res.send({message:`Registration unsuccessful due to ${getError(e)}`,status:false})
      }
      //end of creation
  //  Fetch User Data from Database
  } else if(req.method==='GET')
  {
    const session = await getSession({ req });
    const { user } = session;
    if (!session) {
      return res.status(401).send({ message: 'signin required' });
    }
      try{
        db.connect()
        const user1 = await User.findById(user._id);
        db.disconnect()
        res.send({message:'User details fetched',status:true,data:user1})
      }catch(e){
           res.send({message:'Updation unsuccessful',status:false})
      }
  }else if(req.method==='PUT')
  {
    const session = await getSession({ req });
    const { user } = session;
    if (!session) {
      return res.status(401).send({ message: 'signin required' });
    }
    const { name } = req.body;
    try{
      await db.connect();
      const toUpdateUser = await User.findById(user._id);
      toUpdateUser.name = name;
      // if (password) {
      //   toUpdateUser.password = bcryptjs.hashSync(password);
      // }
    
      await toUpdateUser.save();
      await db.disconnect();
      res.send({message: 'User updated',status:true});
    }catch(e){
      res.send({message: getError(e),status:true});
    }
  //end of update profile information
  }
  else{
      res.send({message:'BAD REQUEST',status:false})
  }
}

export default handler;