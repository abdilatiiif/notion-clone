"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/firebase-admin";

export async function createNewDocument() {
  auth.protect();

  const { sessionClaims } = await auth();

  const userEmail = sessionClaims?.email;

  if (!userEmail) {
    throw new Error(
      "User email is undefined. Cannot create document for undefined user."
    );
  }

  const docCollectionRef = adminDb.collection("documents"); // pushing into documents collection folder in firebase

  const docRef = await docCollectionRef.add({
    title: "new Document 📝",
  }); // when added a new doc, it will return a reference id

  //when created, we also want to add this document to the user that is logged in, to the room.
  // typescript does not know what sessionClaims is, so we use ?  & create types.ts file

  await adminDb
    .collection("users")
    .doc(userEmail)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: userEmail,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}
