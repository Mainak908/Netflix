import { NextRequest, NextResponse } from "next/server";

import { client } from "../../../libs/prismadb";

export async function GET(req: NextRequest) {
  const movies = await client.movie.findMany({});

  return NextResponse.json(movies);
}
