import { NextRequest, NextResponse as res } from "next/server";
import { client } from "../../../libs/prismadb";
import { without } from "lodash";
import { auth } from "../../../auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return res.json("Not signed in");
    }

    const { movieId } = await req.json();

    const existingMovie = await client.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      res.json("Invalid ID");
    }

    const user = await client.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return res.json("Invalid email");
    }

    const updatedFavoriteIds = without(user.favoriteIds, movieId);

    const updatedUser = await client.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
}
