"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "@/components/ui/spinner";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
// import useOwner from "@/lib/useOwner";

function Document({ id }: { id: string }) {
  const [data] = useDocumentData(doc(db, "documents", id)); // returns the existing titile

  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();

  // creating custom hook to fetch document data from firestore
  //const isOwner = useOwner();

  // load the title from firebase firestore

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]); // if data changes, from firestore update the input state

  // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
  const updateTitle = (e: FormEvent) => {
    // react form event
    e.preventDefault();

    if (input.trim()) {
      // dont want blank titles
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div>
      {/* Document title update */}
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form
          className="flex flex-1 space-x-2 items-center"
          onSubmit={updateTitle}
        >
          {/* Update document title form */}
          <Input
            placeholder="Enter document title"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-b-green-300 h-13"
          />

          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating..." : "Update"} {isUpdating && <Spinner />}
          </Button>

          {/* if owner  && inviteUser, DeleteDocument */}
        </form>
      </div>

      <div>
        {/* manage users  */}

        {/* Avatars */}
      </div>

      {/* collab editor  */}
    </div>
  );
}
export default Document;
