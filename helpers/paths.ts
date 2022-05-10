import { useSelector } from "react-redux";
import { RootState } from "../store/store";

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
    }]
};

export default Paths;