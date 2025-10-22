import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  auth.protect();

  const { sessionClaims } = await auth();
  const { room } = await request.json();

  const session = liveblocks.prepareSession(sessionClaims?.email, {
    userInfo: {
      email: sessionClaims?.email,
      avatar: sessionClaims?.avatar,
      fullName: sessionClaims?.fullName,
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    console.log(
      "Authorized Liveblocks session for user:",
      sessionClaims?.email
    );
    return new Response(body, { status });
  } else {
    return NextResponse.json({ message: "not in this room" }, { status: 403 });
  }
}
