import React, {useState} from 'react';
import api from '../api/api';
import { localStorageGet, localStorageRemove, localStorageSave } from '../util/helper-functions';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token, expirationTime) => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjustedExpirationTime = new Date(expirationTime).getTime();

    return (adjustedExpirationTime - currentTime);
}

const retrieveToken = () => {
    const storedToken = localStorageGet('token');
    const storedExpirationTime = localStorageGet('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationTime);

    if (remainingTime <= 0) {
        localStorageRemove('token');
        localStorageRemove('expirationTime');
        localStorageRemove('user');
        return null;
    } else {
        return {
            token: storedToken,
            duration: remainingTime
        }
    }
}

export const AuthContextProvider = (props) => {
    const tokenData = retrieveToken();
    const initialToken = tokenData && tokenData.token;
    const [ token, setToken ] = useState(initialToken);
    const userIsLoggedIn = !!token;

    api.defaults.headers.common['x-access-token'] = token;

    const logoutHandler = () => {
        delete api.defaults.headers.common['x-access-token'];
        setToken(null);
        localStorageRemove('token');
        localStorageRemove('expirationTime');
        localStorageRemove('user');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }

    const loginHandler = (token, expirationTime) => {
        api.defaults.headers.common['x-access-token'] = token;

        localStorageSave('token', token);
        localStorageSave('expirationTime', expirationTime);
        setToken(token);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;