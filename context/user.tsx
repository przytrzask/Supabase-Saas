import * as React from "react";
import { useRouter } from "next/router";

import { supabase } from "../utils/supabase";
import { User } from "@supabase/supabase-js";
import { definitions } from "../types/supabase";

const UserContext = React.createContext<contextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

type contextType = {
  user: User;
  login: () => void;
  logout: () => void;
};

const UserProvider = ({ children }: Props) => {
  const router = useRouter();
  const [user, setUser] = React.useState(null);

  const login = React.useCallback(
    async () =>
      await supabase.auth.signIn({
        provider: "github",
      }),
    []
  );

  const logout = React.useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  }, []);

  const value = React.useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
  );

  React.useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();
      if (sessionUser) {
        const { data: profile } = await supabase
          .from<definitions["profile"]>("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        setUser({ ...sessionUser, ...profile });
      }
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      console.log("ooo");
      getUserProfile();
    });
  }, []);

  console.log({ value });

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;

export const useUserContext = () => {
  const context = React.useContext(UserContext);

  if (!context) throw Error("useUserContext must be within UserProvider");

  return context;
};
