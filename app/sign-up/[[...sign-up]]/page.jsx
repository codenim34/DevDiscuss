"use client";

import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";

const SignUpPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex justify-center w-full mt-6">
        <SignUp 
          afterSignUpUrl="/dev-discuss" 
          afterSignInUrl="/dev-discuss"
          redirectUrl="/dev-discuss"
        />
      </div>
    </>
  );
};

export default SignUpPage;
