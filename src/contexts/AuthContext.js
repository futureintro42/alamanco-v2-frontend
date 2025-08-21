import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react';


// const
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const REGISTER = '@auth/REGISTER';
const auth = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER: {
        const { user } = action.payload;
        return {
          ...state,
          user
        };
      }
      case LOGIN: {
        const { user } = action.payload;
        return {
          ...state,
          isLoggedIn: true,
          isInitialized: true,
          user
        };
      }
      case LOGOUT: {
        return {
          ...state,
          isInitialized: true,
          isLoggedIn: false,
          user: null
        };
      }
      default: {
        return { ...state };
      }
    }
  };

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auth, initialState);

  


  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export default AuthContext;
