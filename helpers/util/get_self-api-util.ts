import { useSelector } from "react-redux";
import { Configuration } from "../configuration";

import { RootState } from '../../store/store';

const GET_SELF = async () => {
    // const token = useSelector((state: RootState) => state?.login?.token)
    const requestHeaders: HeadersInit = new Headers();

    requestHeaders.set('Content-Type', 'application/json');
    try {
        console.log("FIRINGGGGGGGg")
        const sendReq = async () => {
            return fetch(Configuration.GET_SELF_API, {
                method: "GET",
                headers: {
                    // "Authorization": `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3MzksImlhdCI6MTY1MjY5NTM4MCwiZXhwIjoxNjUyNjk1NjgwfQ.goef_lHix9Di-vYNbRJAMfqdpt4VoweFuqGqiQ-0Emk`,
                    "Authorization": `${localStorage.getItem("TOKEN")}`,
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
export default GET_SELF;