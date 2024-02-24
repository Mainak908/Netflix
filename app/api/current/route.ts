import { NextResponse } from "next/server";
import serverAuth from "../../../libs/serverAuth";

export async function GET() {
  const { currentUser } = await serverAuth();
  return NextResponse.json(currentUser);
}
