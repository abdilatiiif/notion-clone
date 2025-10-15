"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { createNewDocument } from "@/actions/actions";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Logic to create a new document
  const handleCreateNewDocument = () => {
    startTransition(async () => {
      console.log("New Document Created");

      const { docId } = await createNewDocument(); // server action
      // push the docId from firebase
      router.push(`/doc/${docId}`);

      // router from next/navigation
    });
  };

  // disable button if pending

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? "Creating New Document..." : "New Document"}
    </Button>
  );
}
export default NewDocumentButton;
