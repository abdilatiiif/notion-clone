// creating a new page component inside doc folder  = doc/[id]/page.tsx
// this is a dynamic route page
// this page will be rendered when user navigates to /doc/:id
// where :id is the document id from firebase
// this page will be used to display the document content
// we will use the id to fetch the document content from firebase
// and display it in a text editor

"use client";
import Document from "@/components/Document";
import { use } from "react";

function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}
export default DocumentPage;
