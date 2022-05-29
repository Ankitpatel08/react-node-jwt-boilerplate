import React, {useState} from 'react';
import api from '../api/api';

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
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationTime);

    if (remainingTime <= 0) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
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

    const logoutHandler = () => {
        delete api.defaults.headers.common['x-access-token'];
        setToken(null);
        localStorage.removeItem('token');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }

    const loginHandler = (token, expirationTime) => {
        api.defaults.headers.common['x-access-token'] = token;

        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
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