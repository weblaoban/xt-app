import request from "@/axios";
import { baseUrl } from "@/config/env";

//添加评论
export const addComment = (data) => {
    return request({
        url: baseUrl + "/prodComm",
        method: "post",
        data: { ...data },
    });
};
export const getAmount = (data) => {
    return request({
        url: baseUrl + "/shop/notice/info",
        method: "get",
    });
};
