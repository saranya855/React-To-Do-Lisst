// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "@/backend/db";

export default function handler(req, res) {
 db.connect()
}
