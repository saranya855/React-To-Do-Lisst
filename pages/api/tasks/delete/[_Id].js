// Import the necessary libraries
import { useAuth } from 'next-auth/react'; 
import db from '@/backend/db';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const { user } = useAuth(); // Access the currently authenticated user
            if (!user) {
                res.status(401).json({ error: 'Not authenticated' });
                return;
            }

            // Connect to the MongoDB database
            await db.connect();

            // Access the tasks collection
            const tasksCollection = db.getCollection('tasks'); // Replace with your actual collection name

            const taskObjectId = db.getObjectId(req.query.taskId);

            // Modify the query to delete only the task for the current user
            const deleteResult = await tasksCollection.deleteOne({ _id: taskObjectId, userId: user.uid });

            if (deleteResult.deletedCount === 1) {
                res.status(204).end();
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            // Disconnect from the database when done
            db.disconnect();
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
