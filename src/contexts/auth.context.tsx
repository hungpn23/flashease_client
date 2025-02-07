"use client";

import { getUser } from "@/actions/fetch-data.action";
import { UserType } from "@/types/data.type";
import { createContext, use, useEffect, useState } from "react";

const AuthContext = createContext<UserType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    getUser()
      .then((user) => {
        if ("email" in user) {
          setUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
        setUser(undefined);
      });
  }, []);

  return <AuthContext value={user}>{children}</AuthContext>;
};
