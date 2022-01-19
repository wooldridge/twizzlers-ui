import React, { useState } from 'react';
import { getUserid } from "../api/api";

interface UserContextInterface {
    userid: string;
    handleLogin: any;
}
  
const defaultState = {
    userid: "",
    handleLogin: () => {}
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

  const handleLogin = () => {
    let sr = getUserid();
    sr.then(result => {
        if (result && result.data) {
            console.log("handleLogin result", result);
            setUserid(result.data);
        }
    }).catch(error => {
        console.error(error);
    })
  };

  return (
    <UserContext.Provider
      value={{
        userid,
        handleLogin
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;