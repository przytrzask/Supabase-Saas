import { useEffect } from "react";
import { supabase } from "../utils/supabase";

import { useUserContext } from "../context/user";

const Logout = () => {
  const { logout } = useUserContext();
  useEffect(logout, []);

  return <p>Logged out</p>;
};

export default Logout;
