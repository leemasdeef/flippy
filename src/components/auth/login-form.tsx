"use client";
import React, { useState, useTransition } from "react";
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
import Socials from "./socials";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "../../../schemas";
import { login } from "../../actions/login";
import FormSuccess from "../form-success";
import FormError from "../form-error";
import { authClient } from "@/server/auth-client";

interface LoginFormProps {
  setIsRegister: (value: boolean) => void;
  onSuccess?: () => void;
}

export default function LoginForm({
  setIsRegister,
  onSuccess,
}: LoginFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // refetch login state to update UI
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success && onSuccess) {
          onSuccess();
        }
      });
    });
  };

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="flippy@email.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="grid gap-3">
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button variant="neutral" onClick={() => setIsRegister(false)}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={() => setIsRegister(true)}
            disabled={isPending}
          >
            Register
          </Button>
          <Button type="submit" disabled={isPending}>
            Login
          </Button>
        </DialogFooter>
      </form>
      <Socials />
    </Form>
  );
}
