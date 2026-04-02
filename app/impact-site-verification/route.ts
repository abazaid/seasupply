import { NextResponse } from "next/server";

const verificationText = "Impact-Site-Verification: 8424cdb2-8578-4598-8260-fde51c185bdc";

export async function GET() {
  return new NextResponse(`${verificationText}\n`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

