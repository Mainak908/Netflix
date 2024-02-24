import { NextRequest, NextResponse as res } from "next/server";
import { client } from "../../../libs/prismadb";
import serverAuth from "../../../libs/serverAuth";

export async function GET(req: NextRequest) {
  const { currentUser } = await serverAuth();
  // console.log(currentUser);

  if (!currentUser) return res.json([]);
  const favoritedMovies = await client.movie.findMany({
    where: {
      id: {
        in: currentUser.favoriteIds,
      },
    },
  });

  return res.json(favoritedMovies);
}
