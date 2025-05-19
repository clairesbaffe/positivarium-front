"use client";

import { createContext, useContext } from "react";

type User = {
  username: string;
  roles: string[];
} | null;

const UserContext = createContext<User>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
