import React from "react";
import { Button } from "@/components/ui/button";
import { GoogleOutlinedIcon } from "../ui/icons/ant-design-google-outlined";
export default function Socials() {
  return (
    <div className="flex items-center w-full gap-2">
      <Button variant="default" className="w-full text-center">
        <GoogleOutlinedIcon />
        Continue with google
      </Button>
    </div>
  );
}
