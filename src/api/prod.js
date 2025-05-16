import request from "@/axios";
import { baseUrl } from "@/config/env";
import {getStore} from "utils/store";
// 产品列表 根据分类id来
export const list = (data) => {
    return request({
        url: baseUrl + "/p/prod/pageProd",
        method: "get",
        meta: {
            isSerialize: true,
        },
        params: data,
    });
};
// 产品列表 根据分类id来
export const yuyuelist = (data) => {
    return request({
        url: baseUrl + "/p/prod/pageProd",
        method: "get",
        meta: {
            isSerialize: true,
        },
        params: data,
    });
};
export const bList = (data) => {
    return request({
        url: baseUrl + "/p/insurance/product/listByUnPaid",
        method: "get",
        meta: {
            isSerialize: true,
        },
        params: {...data,userid:getStore({name:'userInfo'}) && getStore({name:'userInfo'}).id ||  '-1'},
    });
};

export const bProddetail = (params) => {
    return request({
        url: baseUrl + "/p/insurance/product/findUnPaidbyId",
        method: "get",
        params: { ...params,userid:getStore({name:'userInfo'}) && getStore({name:'userInfo'}).id || '-1' },
    });
};

// 产品列表 根据关键字查询
export const keylist = (data) => {
    return request({
        url: baseUrl + '/prod/find',
        method: "get",
        meta: {
            isSerialize: true,
        },
        params: data,
    })
}

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
        url: baseUrl + '/p/prod/prodInfo/',
        method: 'get',
        params: { ...params }
    })
}


export const yuyue = (data) => {
    return request({
        url: baseUrl + '/p/collection/addOrCancel',
        method: 'post',
        data: { ...data,userId:getStore({name:'userInfo'}) && getStore({name:'userInfo'}).id ||  '' }
    })
}
