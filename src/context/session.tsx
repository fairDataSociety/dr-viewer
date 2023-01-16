import React, { useState, createContext, ReactNode, FC } from "react";
import { login } from "../api/user.api";
import Login from "../components/login/login";

export interface User {
  username: string;
  password: string;
}

export interface SessionContext {
  user: User | null;
  login: (username: string, password: string) => Promise<User>;
}

const SessionContext = createContext<SessionContext>({} as SessionContext);

interface SessionContextProps {
  children: ReactNode;
}

const SessionProvider: FC<SessionContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const loginUser = async (username: string, password: string) => {
    try {
      await login({ userName: username, password });

      const user = { username, password };

      setUser(user);

      return user;
    } catch (error) {
      setUser(null);

      throw error;
    }
  };

  return (
    <SessionContext.Provider value={{ user, login: loginUser }}>
      {!user && <Login />}
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;

export { SessionProvider };
