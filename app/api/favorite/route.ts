import { NextRequest, NextResponse as res } from "next/server";
import { without } from "lodash";
import { client } from "../../../libs/prismadb";
import serverAuth from "../../../libs/serverAuth";

async function handler(req: NextRequest) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth();

      const { movieId } = await req.json();

      const existingMovie = await client.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        res.json("Invalid ID");
      }

      const user = await client.user.update({
        where: {
          email: currentUser?.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth();

      const { movieId } = await req.json();

      const existingMovie = await client.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedFavoriteIds = without(currentUser?.favoriteIds, movieId);

      const updatedUser = await client.user.update({
        where: {
          email: currentUser?.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.json(updatedUser);
    }
  } catch (error) {
    console.log(error);
  }
}

export { handler as POST, handler as DELETE };
