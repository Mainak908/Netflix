import { NextRequest, NextResponse as res } from "next/server";
import { client } from "../../../../libs/prismadb";

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const { movieId } = params;
  if (typeof movieId !== "string") {
    res.json({ output: "Invalid Id" });
  }

  if (!movieId) {
    res.json({ output: "missing Id" });
  }

  const movies = await client.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  return res.json(movies);
}
