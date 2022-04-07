
import { AuthState } from './AuthContext';

type AuthAction = 
    | { type: 'SignIn' } 
    | { type: 'LogOut' }
    | { type: 'ChangeFavIcon', payload: string }
    | { type: 'ChangeUsername', payload: string }



// Generador de Estado
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'SignIn':
            return {
                ...state,
                isLoggedIn: true,
                username: 'no-username'
            }

        case 'LogOut':
            return {
                ...state,
                isLoggedIn: false,
                username: undefined,
                favoriteIcon: undefined,
            }

        case 'ChangeFavIcon':
            return {
                ...state,
                favoriteIcon: action.payload
            }

        case 'ChangeUsername':
            return {
                ...state,
                username: action.payload
            }
    
        default:
            return state;
    }
}