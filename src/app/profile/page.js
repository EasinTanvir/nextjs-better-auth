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
      <Profile />
    </div>
  );
};

export default ProfilePage;
