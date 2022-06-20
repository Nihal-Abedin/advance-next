import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import React from "react";
const Paths = () => {

    const log = useSelector((state: RootState) => state.login);

    return [{
        name: "Login",
        path: "/auth-login",
        show: !log.isloggedin
    }, {
        name: "Profile",
        path: "/profile",
        show: log.isloggedin
    }, {
        name: "Home",
        path: "/",
        show: true
    }, {
        name: "All Users",
        path: "/all-users",
        show: log.userType === "ADMIN" || log.data?.userType === "ADMIN"
    }]
};


export default Paths;