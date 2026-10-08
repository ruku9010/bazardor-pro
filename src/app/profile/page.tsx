"use client";

import { updateUser, useSession } from "@/lib/auth-client";
import { useState } from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user;

//   const [show, setShow] = useState(false);

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newUserData = Object.fromEntries(
      formData.entries()
    ) as {
      name: string;
      image: string;
    };

    await updateUser({
      ...newUserData,
    });
  };

  return (
    <div>
      <h1>Profile</h1>

      <p>Welcome, {user?.email}!</p>

      <form onSubmit={handleUpdateProfile}>
        {/* your inputs */}

        <button type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;