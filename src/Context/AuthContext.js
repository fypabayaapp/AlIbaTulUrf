import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState} from 'react';

export const AuthContext = createContext({
  token: '',
  Data: '',
  mode: '',
  isTokenValide: false,
  authenticate: token => {},
  logout: () => {},
});

function AuthContextProvider({children}) {
  const [AuthToken, setAuthToken] = useState();
  const [Data, setData] = useState();
  const [Mode, setMode] = useState();

  async function authenticate(token, Data, mode) {
    setAuthToken(token);
    setData(Data);
    setMode(mode);
  }

  async function logout() {
    setAuthToken(null);
    setData(null);
    setMode(null);

    AsyncStorage.clear();
  }

  const value = {
    token: AuthToken,
    mode: Mode,
    Data: Data,
    isTokenValide: !!AuthToken,
    logout: logout,
    authenticate: authenticate,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
