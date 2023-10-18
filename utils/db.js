import mongoose from "mongoose";
// Define your MongoDB connection string
const mongoURI = process.env.MONGODB_URI;

// Connect to the MongoDB database
mongoose.connect(mongoURI);

// Define a User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default:true
  },
  // You can include other user-related fields here as needed
});

// Define a Task schema
const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  elaborations: {
    type: String,
    required: true,
  },
  important: {
    type: Boolean,
    required: true,
  },
  urgent: {
    type: Boolean,
    required: true,
  },
  due_date: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Task = mongoose.models.Task|| mongoose.model('Task', taskSchema);
export {User,Task}
// Create User and Task models


