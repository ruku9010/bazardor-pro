
"use client";

import { updateUser, useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/sign-in");
    }
  }, [isPending, user, router]);

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();

    if (name.length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }

    setIsUpdating(true);

    try {
      const result = await updateUser({ name });

      if (result.error) {
        setError(result.error.message || "Failed to update profile.");
        return;
      }

      setSuccess("Profile updated successfully!");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    setError("");
    setSuccess("");
    setIsSigningOut(true);

    try {
      const result = await signOut();

      if (result.error) {
        setError(result.error.message || "Failed to sign out.");
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } catch {
      setError("Unable to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending || !user) {
    return (
      <p className="my-20 text-center">
        {isPending ? "Loading profile..." : "Redirecting to sign in..."}
      </p>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-6">
        <section className="w-full rounded-2xl border bg-white p-4 sm:p-6">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-center gap-4">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="Profile image"
                  width={64}
                  height={64}
                  className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-16 sm:w-16"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-700 sm:h-16 sm:w-16">
                  <span className="text-xl font-semibold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}

              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold">
                  {user.name || "User"}
                </h2>
                <p className="break-all text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleSignOut}
              isDisabled={isSigningOut || isUpdating}
              className="w-full shrink-0 sm:w-auto"
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </section>

        {error && (
          <p
            role="alert"
            className="rounded-xl border p-3 text-sm text-red-500"
          >
            {error}
          </p>
        )}

        <section className="w-full rounded-2xl border bg-white p-5 sm:p-8">
          <form onSubmit={handleUpdateProfile} className="w-full">
            <Fieldset>
              <div className="mb-6">
                <Fieldset.Legend>আমার প্রোফাইল</Fieldset.Legend>
                <Description>
                  আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </Description>
              </div>

              <FieldGroup>
                <TextField
                  isRequired
                  name="name"
                  defaultValue={user.name || ""}
                  validate={(value) =>
                    value.trim().length < 3
                      ? "Name must be at least 3 characters."
                      : null
                  }
                >
                  <Label>Name</Label>
                  <Input placeholder="John Doe" />
                  <FieldError />
                </TextField>
              </FieldGroup>

              {success && (
                <p role="status" className="mt-4 text-sm text-green-500">
                  {success}
                </p>
              )}

              <Fieldset.Actions>
                <Button
                  type="submit"
                  isDisabled={isUpdating || isSigningOut}
                  className="mt-4 w-full sm:w-auto"
                >
                  <FloppyDisk />
                  {isUpdating ? "Saving..." : "Save changes"}
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
