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

  const [data] = useCollection(
    // Only run the query when the user and their primary email are available
    user?.emailAddresses?.[0]?.emailAddress
      ? query(
          collectionGroup(db, "rooms"),
          where("userId", "==", user.emailAddresses[0]?.emailAddress)
        )
      : undefined
  );

  useEffect(() => {
    if (!data) return;

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
      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {/*  My Documents */}
        {groupedData.owner.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm text-center">
            No Documents
          </h2>
        ) : (
          <>
            <h2 className="text-gray-500 font-semibold text-sm">
              My Documents
            </h2>

            {groupedData.owner.map((doc) => (
              <SideBarOption
                key={doc.id}
                href={`/doc/${doc.roomId}`}
                id={doc.id}
              />
            ))}
          </>
        )}
      </div>
      {/* Shared with me documents */}

      {groupedData.editor.length > 0 && (
        <>
          <h2 className="text-gray-500 font-semibold text-sm mt-4">
            Shared with me
          </h2>
          {groupedData.editor.map((doc) => (
            <SideBarOption
              key={doc.id}
              href={`/doc/${doc.roomId}`}
              id={doc.id}
            />
          ))}
        </>
      )}
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
      <div className="hidden md:inline w-64 shrink-0 border-2">
        {menuOptions}
      </div>
    </div>
  );
}
export default SideBar;
