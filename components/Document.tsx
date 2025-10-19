"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "@/components/ui/spinner";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

function Document({ id }: { id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id)); // returns the existing titile
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();

  console.log(data);

  // load the title from firebase firestore

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]); // from firestore

  // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
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
      <div>
        <form className="flex gap-2" onSubmit={updateTitle}>
          {/* Update document title form */}
          <Input
            placeholder="Enter document title"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
