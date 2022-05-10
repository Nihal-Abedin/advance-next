
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { Configuration } from "../helpers/configuration";
interface req {
    method:string;
    body:{}
}

const useCustomQuery =  (key:string, reqConfig:req) => {
    const sendReq = async  () => {
        return await fetch(Configuration.LOGIN_API, {
            method: reqConfig?.method? reqConfig.method:"GET",
            headers: reqConfig?.method?{
                "Content-Type": "application/json",
                "x-api-key": Configuration.X_API_KEY,
            }:{},
            body: reqConfig.body? JSON.stringify(reqConfig.body): null,
        });
    }
    const {data, isLoading, isError, error} = useQuery(key,sendReq,{

    })

    return {
        resData: data,
        sendReq
    }
};

export default useCustomQuery;