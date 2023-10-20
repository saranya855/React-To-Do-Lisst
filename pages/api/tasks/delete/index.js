import bcryptjs from 'bcryptjs';
import { Task, User } from '@/utils/db';
import db from '@/backend/db';
import { getSession } from 'next-auth/react';
import { getUserSession } from '@/utils/auth';
import { getServerSession } from 'next-auth';
// import { getError } from '../../../utils/error';
async function handler(req, res) {

  if (req.method === 'POST')
   {
        try {
            const {task_id} = req.body;
            const taskupdate=await Task.findById(task_id)
            taskupdate.status=false
            
            const task = await taskupdate.save();
        
            res.status(201).json(task);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
          }
    }
}

export default handler;