import React, { useState } from "react";
import classes from "./Auth.module.css";
import DefaultLayout from "../../layouts/defaultLayout";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login-slice";
import useCustomQuery from "../../hooks/use_custom_query"
const Login = () => {
    
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const [formData, setFormData] = useState({})
    const {resData, sendReq} = useCustomQuery("login", {method:"POST",body:formData});

    console.log( resData, "LOGGGGG")
    const dispatch = useDispatch()
    const handleSignUp = (state:boolean) => {
        setIsSignUp(prev => state);
    };

    const dispatchLogin = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {target} = e;
        const formData = new FormData((target as HTMLFormElement));
        const data = Object.fromEntries(formData);
        setFormData(data)
        sendReq()
        dispatch(loginActions.login(data))
    }
    return (
        <DefaultLayout>
            <div className="centered">
        <div className={classes.form}>

            <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
            <form onSubmit={isSignUp?()=>{} : dispatchLogin} className={classes.formInput}>
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

                    <button  type="submit">{isSignUp ? "Procced" : "Login"}</button>

                </div>
            </form>
            {!isSignUp && <p className={classes.changeTo}>Don't have an account? <span onClick={() => handleSignUp(true)}>Sign Up</span></p>}
            {isSignUp && <p className={classes.changeTo}><span onClick={() => handleSignUp(false)}>Back</span></p>}
        </div>
    </div>
        </DefaultLayout>
    )
};

export default Login;