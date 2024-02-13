import { createSlice } from "@reduxjs/toolkit";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from './authAction';

const initialState = {
    isAuthenticated: false,
    user: {},
    error: null,
    isLoading: null,

};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state = initialState, action) => {
            switch (action.type) {
                case LOGIN_REQUEST:
                    return {
                        ...state,
                        isLoading: true,
                        error: null
                    };
                case LOGIN_SUCCESS:
                    return {
                        ...state,
                        user: action.payload,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null
                    };
                case LOGIN_FAILURE:
                    return {
                        ...state,
                        isLoading: false,
                        error: action.payload
                    };
                case LOGOUT:
                    return {
                        ...state,
                        isAuthenticated: false,
                        user: null,
                        isLoading: false,
                        error: null
                    };
                default:
                    return state;
            }
        }
    },
},
)


export const { setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;