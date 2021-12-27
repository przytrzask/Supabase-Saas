import { useRouter } from "next/router";
import { useEffect } from "react";
import { supabase } from "../utils/supabase";

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
    };

    logout();
    router.push("/");
  }, []);

  return <p>Logging in</p>;
};

export default Logout;
