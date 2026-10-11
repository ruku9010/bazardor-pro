
"use client";

import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  InputGroup,
  toast,
} from "@heroui/react";

import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const canSubmit =
    password.length > 0 && password === confirmPassword;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!canSubmit) {
      toast.danger("Passwords do not match.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (name.length < 3) {
      toast.danger("Name must be at least 3 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.danger(error.message || "Signup failed.");
        return;
      }

      if (data) {
        toast.success("Signup successful!");
        router.replace("/");
        router.refresh();
      }
    } catch {
      toast.danger("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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
        onSubmit={onSubmit}
        className="my-5 w-full max-w-md rounded-lg bg-white p-6 shadow-md"
      >
        <Fieldset className="w-full">
          <Fieldset.Legend>Sign Up Here</Fieldset.Legend>
          <Description>Create your account.</Description>

          <Fieldset.Group>
            <TextField
              isRequired
              name="name"
              validate={(value) => {
                if (value.trim().length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label>Name</Label>
              <Input placeholder="Enter your name" />
              <FieldError />
            </TextField>

            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="Enter your email" />
              <FieldError />
            </TextField>

            <TextField isRequired fullWidth name="password">
              <Label>Password</Label>

              <InputGroup fullWidth>
                <InputGroup.Input
                  name="password"
                  placeholder="Enter password"
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />

                <InputGroup.Suffix>
                  <button
                    type="button"
                    onClick={() => setIsVisible((value) => !value)}
                    className="flex items-center justify-center focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {isVisible ? (
                      <EyeSlash className="size-4 cursor-pointer text-muted" />
                    ) : (
                      <Eye className="size-4 cursor-pointer text-muted" />
                    )}
                  </button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>

            <TextField isRequired fullWidth name="confirmPassword">
              <Label>Confirm Password</Label>

              <InputGroup fullWidth>
                <InputGroup.Input
                  name="confirmPassword"
                  placeholder="Confirm password"
                  type={isConfirmVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  className={isMismatch ? "border-red-500" : ""}
                />

                <InputGroup.Suffix>
                  <button
                    type="button"
                    onClick={() =>
                      setIsConfirmVisible((value) => !value)
                    }
                    className="flex items-center justify-center focus:outline-none"
                    aria-label="Toggle confirm password visibility"
                  >
                    {isConfirmVisible ? (
                      <EyeSlash className="size-4 cursor-pointer text-muted" />
                    ) : (
                      <Eye className="size-4 cursor-pointer text-muted" />
                    )}
                  </button>
                </InputGroup.Suffix>
              </InputGroup>

              {isMismatch && (
                <p className="text-sm text-red-500">
                  Passwords do not match.
                </p>
              )}
            </TextField>
          </Fieldset.Group>

          <Fieldset.Actions>
            <Button type="submit" isDisabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>

          </Fieldset.Actions>
        </Fieldset>

        <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-4">
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn"
          >
            Login with Google
          </Button>

          <Button
            type="button"
            onClick={handleGithubSignIn}
            className="btn"
          >
            Login with Github
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
