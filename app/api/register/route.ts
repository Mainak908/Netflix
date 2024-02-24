import bcrypt from "bcrypt";
import { NextRequest, NextResponse as res } from "next/server";
import { client } from "../../../libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();

    const existingUser = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.json({
        success: false,
        message: "Email taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await client.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.json(user);
  } catch (error) {
    return res.json({ error: `Something went wrong: ${error}` });
  }
}
