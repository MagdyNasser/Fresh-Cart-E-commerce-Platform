import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react"

export const  authContext = createContext();

//token :
export default function AuthContextProvider({children}) {

    const [userToken, setUserToken] = useState(function(){
      // complex operations
      return localStorage.getItem('tkn');
    });

    const [userData, setUserData] = useState(null);

    function decryptUserToken() {
      const res = jwtDecode(localStorage.getItem('tkn'));

      // console.log('user data', res);
      setUserData(res);
    }

    useEffect(()=> {
      if(userToken) {
        decryptUserToken();
      }
    }, [userToken])

    // Lazy intialization :

    // 3 Lifecycle methods :

    useEffect(function(){
      console.log('Refresh')
      const tkn = (localStorage.getItem('tkn'));
      if(tkn != null) {
        setUserToken(tkn);
      }
    }, []);

  return (
      <authContext.Provider value= {{
        setUserToken,
        userToken,
        userData,
      }}>
      {children}
      </ authContext.Provider>
  )
}
