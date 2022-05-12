import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Configuration } from '../helpers/configuration';
import useCustomQuery from '../hooks/use_custom_query';
import useHttp from "../hooks/use_custom_query"

interface login {
    isloggedin: boolean,
    token: string;
    userType: string;
    username: string;
}
const initialState: login = {
    isloggedin: false,
    token: "",
    userType: "",
    username: ""
}
interface Payload {
    payload: {
        type: string;
        token: string;
        userType: string;
        username: string;

    };

}
const Login_Slice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login(state: login) {
            state.isloggedin = true;

        },
        setToken(state: login, actions: Payload) {
            state.token = `${actions.payload.type} ${actions.payload.token}`;
            state.userType = actions.payload.userType;
            state.username = actions.payload.username;
            localStorage.setItem("TOKEN", state.token);
        }
    }
});

export const loginActions = Login_Slice.actions;

export default Login_Slice.reducer;