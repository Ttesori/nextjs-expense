import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const checkUser = async () => {
  const user = await currentUser();

  // Check for current logged in clerk user
  if (!user) {
    return null;
  }

  // Check if the user is in the database
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  // If user is in DB, return user
  if (loggedInUser) {
    return loggedInUser;
  }

  // If not in DB, craete new user
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  return newUser;
};
