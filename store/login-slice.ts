import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Configuration } from '../helpers/configuration';
import useCustomQuery from '../hooks/use_custom_query';
import useHttp from "../hooks/use_custom_query"

interface login {
    isloggedin: boolean
}
const initialState: login = {
    isloggedin: false,
}

const Login_Slice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login(state, action) {

            // const { isOk } = useCustomQuery()
            // const sendReq = () => {
            //     return fetch("https://exam.greeho.com/api/users/login", {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //             "x-api-key": Configuration.X_API_KEY,
            //         },
            //         body: JSON.stringify(action.payload)
            //     })
            // }
            // useHttp(sendReq, "login")
            // console.log(isOk)

        }
    }
});

export const loginActions = Login_Slice.actions;

export default Login_Slice.reducer;