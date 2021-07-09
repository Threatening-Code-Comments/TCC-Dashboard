import React from "react";
import { signInWithGoogle } from "../Firebase";

const SignIn = () => {
  return (
    <div>
      <button
        className="button glass"
        onClick={() => {
          signInWithGoogle();
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
