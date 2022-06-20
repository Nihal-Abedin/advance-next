import React, { useEffect, useState } from "react";
import classes from "./Auth.module.css";
import DefaultLayout from "../../layouts/defaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/login-slice";
import LOGIN from "../../helpers/util/login-api-util";
import SIGNUP from "../../helpers/util/signup-api-util";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useCookies } from "react-cookie";
import { parseCookies } from "../../helpers/coockie";

const Login = () => {

    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const [cookies, setCookies] = useCookies(["user"])

    const router = useRouter();

    // console.log(cookies)

    // const {resData, sendReq} = useCustomQuery("login", {method:"POST",body:formData});

    // console.log( resData, "LOGGGGG")
    const dispatch = useDispatch();

    const handleSignUp = (state: boolean) => {
        setIsSignUp(prev => state);
    };

    const dispatchLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { target } = e;
        const formData = new FormData((target as HTMLFormElement));
        const data = Object.fromEntries(formData);
        const resData = await LOGIN({ data: data });
        if (resData.status === 200) {
            dispatch(loginActions.login());
            dispatch(loginActions.setToken({ type: resData.data.tokenType, token: resData.data.accessToken, username: resData.data.user.username, userType: resData.data.user.userType }))
            router.replace("/");
            setCookies("user", resData.data.user, {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })


        }
        // console.log(resData, "RES DATAAAA")

    }
    const dispatchSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { target } = e;
        const formData = new FormData((target as HTMLFormElement));
        const data = Object.fromEntries(formData);

        const resData = await SIGNUP({ data: data });
        if (resData.status === 200) {
            dispatch(loginActions.login());
            dispatch(loginActions.setToken({ type: resData.data.tokenType, token: resData.data.accessToken, username: resData.data.user.username, userType: resData.data.user.userType }))
            // setCookies("user", resData.data.user, {
            //     maxAge: 3600,
            //     path: "/",
            // })
            router.prefetch("/");
            router.replace("/");


        }
        // console.log(resData, "SIGN UP RES DATAAAA")

    }
    return (
        <DefaultLayout>
            <div className="centered">
                <div className={classes.form}>

                    <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
                    <form onSubmit={isSignUp ? dispatchSignUp : dispatchLogin} className={classes.formInput}>
                        <div className={classes.emailInput}>
                            <p>User Name</p>
                            <input type="text" name="username" required />

                        </div>
                        {isSignUp && <div className={classes.emailInput}>
                            <p>Email</p>
                            <input type="email" name="email" required />

                        </div>}
                        {isSignUp && <div className={classes.emailInput}>
                            <p>Mobile</p>
                            <input type="text" name="mobile" required />

                        </div>}
                        <div className={classes.passwordInput}>
                            <p>Password</p>
                            <input type="password" name="password" required />

                        </div>

                        {isSignUp && <div className={classes.passwordInput}>
                            <p>Confirm Password</p>
                            <input type="password" name="confirmPassword" required />

                        </div>}

                        <div className={classes.loginBtn}>

                            <button type="submit">{isSignUp ? "Procced" : "Login"}</button>

                        </div>
                    </form>
                    {!isSignUp && <p className={classes.changeTo}>Don't have an account? <span onClick={() => handleSignUp(true)}>Sign Up</span></p>}
                    {isSignUp && <p className={classes.changeTo}><span onClick={() => handleSignUp(false)}>Back</span></p>}
                </div>
            </div>
        </DefaultLayout>
    )
};
export const getServerSideProps: GetServerSideProps = async ({ req }: GetServerSidePropsContext) => {

    // const isAuthentic = req.cookies
    const { user } = parseCookies(req);
    console.log(user, "sadasdas")
    if (user) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},
        };
    }
    return {

        props: {}
    }
}
export default Login;