import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, params, bodyData, headers) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null
    })
}