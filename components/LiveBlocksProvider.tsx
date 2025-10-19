"use client";

// we will create a LiveBlocksProvider component for only the doc page
// this component will wrap the doc page and provide liveblocks functionality
// we will use the LiveblocksProvider from @liveblocks/react/suspense
// we will also need to provide the authEndpoint prop to the LiveblocksProvider
// the authEndpoint is a server endpoint that will return a JWT token for authenticating the user
// we will create this endpoint later

import { LiveblocksProvider } from "@liveblocks/react/suspense";

function LiveBlocksProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error("LIVEBLOCKS_PUBLIC_KEY is not defined");
  }

  return (
    <LiveblocksProvider authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProvider>
  );
}
export default LiveBlocksProvider;
