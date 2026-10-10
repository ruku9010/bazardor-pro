
"use client";

import { signIn } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";

const SignInPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const { error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.danger(error.message || "Sign in failed.");
        return;
      }

      toast.success("Sign in successful!");
      router.replace("/");
      router.refresh();
    } catch {
      toast.danger("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.danger(error.message || "Google sign in failed.");
      }
    } catch {
      toast.danger("Google sign in failed. Please try again.");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.danger(error.message || "GitHub sign in failed.");
      }
    } catch {
      toast.danger("GitHub sign in failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Form
        className="my-5 w-full max-w-md rounded-lg bg-white p-6 shadow-md"
        onSubmit={onSubmit}
      >
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input
            placeholder="john@example.com"
            autoComplete="email"
          />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            সাইন ইন করুন
          </Button>
        </div>

        <div className="my-4 flex w-full items-center" />

        <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-4">
          <Button
            type="button"
            onClick={handleGoogleSignIn}
          >
            Login with Google
          </Button>

          <Button
            type="button"
            onClick={handleGithubSignIn}
          >
            Login with Github
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignInPage;
