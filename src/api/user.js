import request from "@/axios";
import { baseUrl } from "@/config/env";
// 登录
export const loginByUsername = (data) =>
	request({
		url: baseUrl + "/login",
		method: "post",
		meta: {
			isToken: false,
		},
		data: {
			...data,
		},
	});

export const refreshToken = () =>
	request({
		url: baseUrl + "/user/refresh",
		method: "post",
	});

export const getMenu = (type = 0) =>
	request({
		url: baseUrl + "/user/getMenu",
		method: "get",
		params: {
			type,
		},
	});

export const getTopMenu = () =>
	request({
		url: baseUrl + "/user/getTopMenu",
		method: "get",
	});

export const sendLogs = (list) =>
	request({
		url: baseUrl + "/user/logout",
		method: "post",
		data: list,
	});

export const logout = () =>
	request({
		url: baseUrl + "/user/logout",
		meta: {
			isToken: false,
		},
		method: "get",
	});

// 注册
export const register = (data) =>
	request({
		url: baseUrl + "/user/register",
		method: "post",
		data: data,
	});

// 获取用户信息
export const getUserInfo = () =>
	request({
		url: baseUrl + "/p/user/userInfo",
		method: "get",
	});
// 修改密码
export const modifyPassword = (data) =>
	request({
		url: baseUrl + "/user/updatePwd",
		method: "put",
		data: data,
	});

// 发送短信验证码
export const sendSmsCode = (data) =>
	request({
		url: baseUrl + "/p/sms/send",
		method: "post",
		data: data,
	});
