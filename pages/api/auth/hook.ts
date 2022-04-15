// pages/api/auth/hook
import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

/*
  This endpoint does the following:

  Validates the request is a POST request
  Validates the AUTH0_HOOK_SECRET from the request body is correct
  Validates that an email was provided in the request body
  Creates a new user record
*/

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, secret } = req.body;
  // 1
  if (req.method !== 'POST') {
    return res.status(403).json({ message: 'Method not allowed' });
  }
  // 2
  if (secret !== process.env.AUTH0_HOOK_SECRET) {  
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }
  // 3
  if (email) {
    // 4
    await prisma.user.create({
      data: { email },
    });
    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`,
    });
  }
};

export default handler;