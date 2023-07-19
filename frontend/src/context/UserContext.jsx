import PropTypes from "prop-types";
import { useContext, createContext, useState, useMemo } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const handleUser = (updateUser) => {
    setUser(updateUser);
  };

  const value = useMemo(() => ({ user, handleUser }), [user, handleUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
