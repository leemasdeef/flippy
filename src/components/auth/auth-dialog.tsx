import React, { useState } from "react";
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
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

interface AuthDialogProp {
  onLoginSuccess: () => void;
}
export default function AuthDialog({ onLoginSuccess }: AuthDialogProp) {
  const [open, setOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  console.log("setIsRegister in parent: ", setIsRegister);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isRegister ? "Register" : "Login"}</DialogTitle>
          <DialogDescription>
            Please enter your details below.
          </DialogDescription>
        </DialogHeader>
        <div>
          {!isRegister && (
            <LoginForm
              setIsRegister={setIsRegister}
              onSuccess={onLoginSuccess}
            />
          )}
          {isRegister && (
            <RegisterForm
              setIsRegister={setIsRegister}
              onSuccess={() => setOpen(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
