// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "@/backend/db";
import { User } from "@/utils/db";

export default async function handler(req, res) {
 const user = await User.find() // Use findOne to find a user by their _id
 console.log(user);
}
