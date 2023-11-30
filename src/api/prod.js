import request from "@/axios";
import { baseUrl } from "@/config/env";
// 产品列表 根据分类id来
export const list = (data) => {
    return request({
        url: baseUrl + "/p/prod/pageProd",
        method: "get",
        meta: {
            isSerialize: true,
        },
        params: { ...data, soldNum: -1 },
    });
};

// 资讯用来查banner 问答和资讯根据分类id来
export const zxlist = (params) => {
    return request({
        url: baseUrl + "/content/page",
        method: "get",
        meta: {
            isSerialize: true,
        },
        params: { status: 0, ...params },
    });
};


// 资讯详情
export const zxdetail = (id) => {
    return request({
        url: baseUrl + '/content/info/' + id,
        method: 'get'
    })
}


export const proddetail = (params) => {
    return request({
        url: baseUrl + '/prod/prodInfo/',
        method: 'get',
        params: { ...params }
    })
}



export const yuyue = (data) => {
    return request({
        url: baseUrl + '/p/collection/addOrCancel',
        method: 'post',
        data: { ...data }
    })
}