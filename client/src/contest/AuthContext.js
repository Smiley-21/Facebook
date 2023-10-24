import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  user: {_id:"652e740c29295b791c7f70a1",
  username:"hey123",
  email:"hey123@gmail.com",
  password:"$2b$10$tFJlxXgBzNrQiRJLFUIBxOeRqlslCyvnrC6Iy87eX5sWzbHSmoYji",
  profilePicture:"",
  coverPicture:"",
  followers:[],
  following:[],
  isAdmin:false,
  _v:0
    
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >{children}</AuthContext.Provider>
  );
};


