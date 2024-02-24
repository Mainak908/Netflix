"use server";
import { auth } from "../auth";
import { client } from "./prismadb";

const serverAuth = async () => {
  const session = await auth();
  // console.log(session);

  if (!session?.user?.email) {
    return { currentUser: null };
  }

  const currentUser = await client.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    return { currentUser: null };
  }

  return { currentUser };
};

export default serverAuth;
