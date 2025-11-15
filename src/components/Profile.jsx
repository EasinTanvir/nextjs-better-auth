"use client";

import { authClient } from "@/utils/auth-client";
import React from "react";

const Profile = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  console.log("session", session);

  return <div>Profile</div>;
};

export default Profile;
