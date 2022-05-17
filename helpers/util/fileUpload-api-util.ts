import { Configuration } from "../configuration";
interface req {
    file: any

}
const FILE_UPLOAD = async (data: any) => {
    console.log(data)
    try {

        const sendReq = async () => {
            return fetch(Configuration.FILE_UPLOAD_API, {
                method: "POST",
                headers: {
                    "Authorization": `${localStorage.getItem("TOKEN")}`,
                    'x-api-key': Configuration.X_API_KEY,
                },
                body: data,
            });
        }
        // const sendReq = fetch(Configuration.UPLOAD_IMG, {
        //     method: "POST",
        //     headers: {
        //         "Authorization": localStorage.getItem("GreehoToken"),
        //         'x-api-key': Configuration.X_API_KEY,
        //     },
        //     body: data,
        // });
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
export default FILE_UPLOAD;