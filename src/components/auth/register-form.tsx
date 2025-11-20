import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Socials from "./socials";

import React from "react";

export default function RegisterForm() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Register</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Email</Label>
              <Input id="name-1" name="email" placeholder="flippy@email.com" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password-1">Password</Label>
              <Input id="password-1" name="password" />
            </div>
            <Socials />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="neutral">Cancel</Button>
            </DialogClose>
            <Button type="submit">Register</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
