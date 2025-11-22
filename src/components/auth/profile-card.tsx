"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { authClient } from "@/server/auth-client";

export default function ProfileCard() {
  const { data: session } = authClient.useSession(); // check for logged in user

  if (!session) {
    return null;
  }

  const user = session.user;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>{user.name}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <h4 className="font-heading">{user.name}</h4>
        </div>
        <div>
          <Button
            onClick={async () => {
              await authClient.signOut();
            }}
          >
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
