import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchUserProfile } from "../MainBodyCode/middleware";

const UserContext = createContext(null);

// Wraps the whole app (see main.jsx) and fetches "/user/profile" exactly once
// per navigation instead of every page/component doing its own fetch.
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const refreshUser = useCallback(async () => {
    const result = await fetchUserProfile();

    if (!result || !result.user) {
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem("userId");
      setLoadingUser(false);
      return null;
    }

    setUser(result.user);
    setIsAuthenticated(Boolean(result.isAuthenticated));
    sessionStorage.setItem("userId", result.user._id);
    setLoadingUser(false);
    return result;
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem("userId");
  }, []);

  useEffect(() => {
    refreshUser();
    // Only run once on mount; callers (e.g. after route changes or login/logout)
    // can call refreshUser()/clearUser() explicitly when they need fresh data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, loadingUser, refreshUser, clearUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
