import { NextRequest, NextResponse as res } from "next/server";
import { client } from "../../../libs/prismadb";
import serverAuth from "../../../libs/serverAuth";

export async function GET(req: NextRequest) {
  try {
    // await serverAuth();

    const moviesCount = await client.movie.count({});
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await client.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return res.json(randomMovies[0]);
  } catch (error) {
    console.log(error);
  }
}
