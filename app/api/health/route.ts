import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json(
    { status: "Server is healthy and fully operational" },
    { status: 200 }
  );
};
