import type { AxiosRequestConfig } from "axios";
import { request } from "umi";

export const umiRequest = async (config: AxiosRequestConfig | boolean | any) => {
    if (!config) {
        console.warn("未满足请求条件")
        return { data: null };
    }
    console.log('config: ', config);
    switch (config.method) {
        case "get":
        case "delete":
            {
                config.params = config.data || config.body;
                config.data = config.body = null;
                break;
            }
    }
    // const axiosInstance: AxiosInstance = axios.create(config);
    const result = await request(config.url, { ...config, timeout: 1000 * 60 * 5 });

    console.log('axiosInstance:result ', result);
    if (config.url?.toLocaleLowerCase().include('api/graphql')) {
        console.log('graphql result', result);
        const finalResult = {
            ...result,
            data: result.data,
        };

        console.log('graphql finalResult', finalResult);
        return finalResult;
    } else {
        console.log('defaultRequest result ', result);
        const finalResult = {
            ...result,
        };
        console.log('defaultRequest finalResult', finalResult);
        return finalResult;
    }
}