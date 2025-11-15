"use client";

import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const router = useRouter();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  console.log("session", session);

  const logoutHandler = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  return (
    <div>
      {session && (
        <button
          onClick={logoutHandler}
          className="bg-red-700 text-white p-2 rounded-2xl"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Profile;
