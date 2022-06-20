import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface login {
    isloggedin: boolean,
    token: string;
    userType: string;
    username: string;
    data: { userType: string } | null;
}
const initialState: login = {
    isloggedin: false,
    token: "",
    userType: "",
    username: "",
    data: null,
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
            state.isloggedin = localStorage.getItem("TOKEN") ? true : false;
        },
        setToken(state: login, actions: Payload) {
            state.token = `${actions.payload.type} ${actions.payload.token}`;
            localStorage.setItem("TOKEN", state.token);

        },
        setUser(state: login, actions: Payload) {
            // state.userType = actions.payload.userType;
            state.username = actions.payload?.username;
            state.data = actions.payload
        }
    }
});

export const loginActions = Login_Slice.actions;

export default Login_Slice.reducer;