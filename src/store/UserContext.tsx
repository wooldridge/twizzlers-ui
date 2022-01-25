import React, { useState } from 'react';
import { twizzlersLogin, hcLogin, hcGetSession } from "../api/api";
import { auth } from "../config/auth";
interface UserContextInterface {
    userid: string;
    handleTwizzlersLogin: any;
    handleHCLogin: any;
    handleHCGetSession: any;
}
  
const defaultState = {
    userid: "",
    handleTwizzlersLogin: () => {},
    handleHCLogin: () => {},
    handleHCGetSession: () => {}
};

/**
 * Component for storing user-oriented state such as authentication.
 *
 * @component
 * @prop {string} userid - User UUID value.
 * @prop {handleLogin} handleDetail - Method for requesting UUID from login endpoint. 
 * @example
 * TBD
 */
export const UserContext = React.createContext<UserContextInterface>(defaultState);

const UserProvider: React.FC = ({ children }) => {

  const [userid, setUserid] = useState<string>("");

  const handleTwizzlersLogin = () => {
    let sr = twizzlersLogin();
    sr.then(result => {
        if (result && result.data) {
            console.log("handleLogin result", result);
            setUserid(result.data);
        }
    }).catch(error => {
        console.error(error);
    })
  };

  const handleHCLogin = () => {
    let sr = hcLogin(auth.hubCentral.username, auth.hubCentral.password);
    sr.then(result => {
        if (result && result.data) {
            console.log("handleLogin result", result);
            localStorage.setItem("loginResp", JSON.stringify(result.data));
        }
    }).catch(error => {
        console.error(error);
    })
  };

  const handleHCGetSession = () => {
    let sr = hcGetSession();
    sr.then(result => {
        if (result && result.data) {
            console.log("hcGetSession result", result);
        }
    }).catch(error => {
        console.error(error);
    })
  };

  return (
    <UserContext.Provider
      value={{
        userid,
        handleTwizzlersLogin,
        handleHCLogin,
        handleHCGetSession
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;