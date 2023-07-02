import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loding: false,
  error: null,
  token: JSON.parse(localStorage.getItem("token")) || null,
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loding: true,
        error: null,
        token: null,
        isAdmin: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.data,
        loding: false,
        error: null,
        token: action.payload.token,
        isAdmin: action.payload.data?.isAdmin,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loding: false,
        error: action.payload,
        token: null,
        isAdmin: false,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      return {
        user: null,
        loading: false,
        error: null,
        token: null,
        isAdmin: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", JSON.stringify(state.token));
    localStorage.setItem("isAdmin", JSON.stringify(state.isAdmin));
  }, [state.user, state.token, state.isAdmin]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        token: state.token,
        dispatch,
        isAdmin: state.isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
