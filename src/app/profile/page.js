import Profile from "@/components/Profile";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import React from "react";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  console.log("session", session);
  return (
    <div>
      <h3 className="text-2xl">{session?.user?.name}</h3>
      <h3 className="text-2xl">{session?.user?.email}</h3>
      <Profile />
    </div>
  );
};

export default ProfilePage;
