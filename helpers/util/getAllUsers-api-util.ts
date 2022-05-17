import { useSelector } from "react-redux";
import { Configuration } from "../configuration";

import { RootState } from '../../store/store';

const GET_USERS = async () => {
    // const token = useSelector((state: RootState) => state?.login?.token)

    try {
        const sendReq = async () => {
            return fetch(`https://exam.greeho.com/api/users?query=north&offset=5&currentPage=1&sortBy=userId&orderBy=desc`, {
                method: "GET",
                headers: {
                    "x-api-key": Configuration.X_API_KEY,
                    'Content-Type': 'application/json'
                }
            });
        }
        const res = await sendReq();
        // console.log(res, "REQQQQQQ")

        if (res.status === 500) {

            console.log("500 RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
            const res = await sendReq();
            return await res.json();
        }
        if (!res.ok) {
            const errorData = await res.json();
            throw errorData;
        }
        return await res.json();
    } catch (err) {
        return err;
    }

}
export default GET_USERS;