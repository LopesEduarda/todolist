import React, { useState } from "react";
import Signup from "./Signup";
import Signin from "./Signin";



export default function Auth() {
  const [authPage, setAuthPage] = useState<"signup" | "signin">("signup");

  const ToogleAuthPage = () => {
    setAuthPage((prevAuthPage) =>
      prevAuthPage === "signin" ? "signup" : "signin"
    );
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#1e3a8a] to-purple-950 flex justify-center items-center">
      {authPage === "signin" ? (
        <Signin toggleAuthPage={ToogleAuthPage} />
      ) : (
        <Signup toggleAuthPage={ToogleAuthPage} />
      )}
    </div>
  );
}
