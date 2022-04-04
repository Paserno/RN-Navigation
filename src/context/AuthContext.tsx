import React, { createContext } from 'react';

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
}

// Crear el contexto
export const AuthContext = createContext({} as AuthContextProps );

// Componente proveedor del estado 
export const AuthProvider = ({ children }: any ) => {


    
    return (
        <AuthContext.Provider value={{
            authState: authInitialState,
            signIn: () => {}
        }}>
            { children }
        </AuthContext.Provider>
    )
}