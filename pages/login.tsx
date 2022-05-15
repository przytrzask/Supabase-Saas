import React, { useCallback, useEffect, useRef } from "react";
import { useUserContext } from "../context/user";
import { supabase } from "../utils/supabase";
import { Router, useRouter } from "next/router";

const Login = () => {
  const [isSent, setIsSent] = React.useState(false);

  const { login } = useUserContext();
  const router = useRouter();

  const inputRef = useRef(null);

  const onSubmit = useCallback(async (evt) => {
    evt.preventDefault();
    const email = inputRef.current?.value;
    login(email).then((res) => {
      setIsSent(true);
    });
  }, []);

  return (
    <main className="layout-max mx-auto flex justify-center align-center flex-col">
      <h1 className="mt-1 text-4xl font-semibold  md:text-5xl text-center mb-2">
        {isSent ? "Email sent" : "Sign in ✨"}
      </h1>
      <div className="mt-4 sm:mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        {!isSent && (
          <form onSubmit={onSubmit}>
            <label className="block text-sm font-semibold leading-5">
              Email address
              <input
                ref={inputRef}
                type="text"
                className={`bg-gray-100 text-left font-semibold rounded-md w-full h-12 pl-4 `}
                placeholder="you@email.com"
              />
            </label>
            <button
              type="submit"
              className="w-full h-12 bg-gray-600 text-white mt-2 rounded-md"
            >
              Email a login link
            </button>
          </form>
        )}

        {isSent && (
          <h2 className="mt-1 text-xl font-semibold  md:text-2xl text-center mt-2">
            Please check your inbox for your sign in link.
          </h2>
        )}
      </div>
    </main>
  );
};

export default Login;
