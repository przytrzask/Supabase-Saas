import { useEffect } from "react";
import { useUserContext } from "../context/user";
import { supabase } from "../utils/supabase";

const Login = () => {
  const { login } = useUserContext();

  useEffect(login, []);

  return <p>Logging in</p>;
};

export default Login;
