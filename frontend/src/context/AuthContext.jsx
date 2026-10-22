
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const TOKEN_KEY = "campusone_token";
const USER_KEY = "campusone_user";

function readStoredUser() {
  try {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY)
  );
  const [user, setUser] = useState(readStoredUser);

  const login = useCallback((authData) => {
    const nextToken = authData?.token;
    const nextUser = authData?.user;

    if (!nextToken) {
      throw new Error("A valid authentication token is required.");
    }

    localStorage.setItem(TOKEN_KEY, nextToken);

    if (nextUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    }

    setToken(nextToken);
    setUser(nextUser ?? null);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [user, token, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
