"use client";

import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import { useCollection } from "react-firebase-hooks/firestore";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SideBarOption from "./SideBarOption";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  userId: string;
  roomId: string;
}

function SideBar() {
  const { user } = useUser();

  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({ owner: [], editor: [] });

  // every time data changes, it will re render the component

  const [data, loading, error] = useCollection(
    // check if user is logged in
    // also check if every user room sub collection id, matches the user id that is logged in
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return;

    console.log("📊 Processing data:", data.docs.length, "documents");

    const grouped = data?.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;

        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }

        return acc;
      },
      { owner: [], editor: [] }
    );

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />
      {/*  My Documents */}
      {groupedData.owner.length === 0 ? (
        <h2 className="text-gray-500 font-semibold text-sm">No Documents</h2>
      ) : (
        <>
          <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>

          {/* /groupedData.owner.map((doc) => <SideBareOption key={doc.roomId} />)*/}

          {groupedData.owner.map((doc) => (
            <SideBarOption
              key={doc.id}
              href={`/doc/${doc.roomId}`}
              id={doc.id}
            />
          ))}
        </>
      )}
      {/* Shared with me documents */}
      {/*  list */}
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon
              className="p-2 hover:opacity-30 cursor-pointer"
              size={40}
            />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              {menuOptions}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">
        <NewDocumentButton />
      </div>
    </div>
  );
}
export default SideBar;
