import React from "react";
import { Button } from "@/components/ui/button";
import { GoogleOutlinedIcon } from "../ui/icons/ant-design-google-outlined";
import { authClient } from "@/server/auth-client";
export default function Socials() {
  return (
    <div className="flex items-center  gap-2 mb-4 mt-4">
      <Button
        variant="default"
        className="w-full text-center"
        onClick={async () => {
          await authClient.signIn.social({
            provider: "google",
          });
        }}
      >
        <GoogleOutlinedIcon />
        Continue with Google
      </Button>
    </div>
  );
}
