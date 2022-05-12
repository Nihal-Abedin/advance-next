import { Configuration } from "../configuration";
interface req {
    data: {}

}
const LOGIN = async (reqConfig: req) => {
    try {

        const sendReq = async () => {
            return fetch(Configuration.LOGIN_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": Configuration.X_API_KEY,
                },
                body: JSON.stringify(reqConfig.data),
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
export default LOGIN;