import React, { createContext, useReducer } from 'react';
import { authReducer } from './authReducer';

// Definir como luce que información se tendra TY
export interface AuthState {
    isLoggedIn: boolean;
    username?: string;
    favoriteIcon?: string;
}

// Estado Inicial
export const authInitialState: AuthState = {
    isLoggedIn: false,
    username: undefined,
    favoriteIcon: undefined,
}

// Se usará para decir que tendra el context TY
export interface AuthContextProps {
    authState: AuthState;
    signIn: () => void;
    logOut: () => void;
    changeFavoriteIcon: ( iconName: string ) => void;
    changeUsername: ( username: string ) => void;
}

// Crear el contexto
export const AuthContext = createContext({} as AuthContextProps );

// Componente proveedor del estado 
export const AuthProvider = ({ children }: any ) => {

    // Componente proveedor de Estados 
    const [authState, dispatch] = useReducer( authReducer, authInitialState);

    const signIn = () => {
        dispatch({ type: 'SignIn' });
    }

    const logOut = () => {
        dispatch({ type: 'LogOut' });
    }

    const changeFavoriteIcon = ( iconName: string ) => {
        dispatch({ type: 'ChangeFavIcon', payload: iconName})
    }

    const changeUsername = ( username: string ) => {
        dispatch({ type: 'ChangeUsername', payload: username})
    }
    
    return (
        <AuthContext.Provider value={{
            authState,
            signIn,
            logOut,
            changeFavoriteIcon,
            changeUsername

        }}>
            { children }
        </AuthContext.Provider>
    )
}