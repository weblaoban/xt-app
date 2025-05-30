import { setToken, removeToken } from 'utils/auth'
import { setStore, getStore, clearStore } from 'utils/store'
import { encrypt, deepClone } from 'utils/util'
import { loginByUsername, getUserInfo, getMenu, getTopMenu, logout, refreshToken } from '@/api/user'
import { formatPath } from '@/router/avue-router'
import { ElMessage } from 'element-plus'

const user = {
    state: {
        userInfo: getStore({ name: 'userInfo' }) || {},
        permission: {},
        roles: [],
        menuId: {},
        menu: getStore({ name: 'menu' }) || [],
        menuAll: getStore({ name: 'menuAll' }) || [],
        token: getStore({ name: 'token' }) || '',
        refreshToken: getStore({ name: 'token' }) || ''
    },
    actions: {
        //根据用户名登录
        LoginByUsername({ commit }, userInfo = {}) {
            //   const user = encryption({
            //     data: userInfo,
            //     type: 'Aes',
            //     key: 'avue',
            //     param: ['useranme', 'password']
            //   });
            const user = userInfo

            return new Promise((resolve) => {
                loginByUsername({
                    userName: user.username,
                    passWord: encrypt(user.password)
                }).then(res => {
                    if (res && res.data && res.data.success) {
                        const data = res.data.data;
                        commit('SET_TOKEN', data.accessToken);
                        commit('SET_REFRESH_TOKEN', data.refreshToken);
                        commit('DEL_ALL_TAG', []);
                        commit('CLEAR_LOCK');
                    } else {

                    }
                    resolve(res);
                })
            })
        },
        //根据手机号登录
        LoginByPhone({ commit }, userInfo) {
            return new Promise((resolve) => {
                loginByUsername(userInfo.phone, userInfo.code).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG', []);
                    commit('CLEAR_LOCK');
                    resolve();
                })
            })
        },
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then((res) => {
                    const data = res.data.data;
                    if (data.userMemo === '1') {
                        commit('SET_USERIFNO', data);
                        setStore({ name: 'userInfo', content: data });
                        resolve(data);
                    } else {
                        const message = data.userMemo === '2'
                            ? "您的注册审核未通过，请联系管理员"
                            : "您的注册申请已发送，请耐心等待审核";
                        ElMessage.info({
                            message,
                            icon:'none'
                        });
                        reject();
                    }
                }).catch(err => {
                    reject(err);
                })
            })
        },
        //刷新token
        RefreshToken({ state, commit }) {
            return;
            return new Promise((resolve, reject) => {
                refreshToken(state.refreshToken).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data);
                    commit('SET_REFRESH_TOKEN', data);
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                // logout().then(() => {
                commit('SET_TOKEN', '')
                commit('SET_REFRESH_TOKEN', '');
                commit('SET_MENUALL_NULL', []);
                commit('SET_MENU', [])
                commit('SET_ROLES', [])
                commit('DEL_ALL_TAG', []);
                commit('CLEAR_LOCK');
                commit('SET_USERIFNO', {});
                clearStore()
                removeToken()
                resolve()
                // }).catch(error => {
                //     reject(error)
                // })
            })
        },
        //注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_REFRESH_TOKEN', '');
                commit('SET_MENUALL_NULL', []);
                commit('SET_MENU', [])
                commit('SET_ROLES', [])
                commit('DEL_ALL_TAG', []);
                commit('CLEAR_LOCK');
                removeToken()
                resolve()
                clearStore()
            })
        },
        GetTopMenu() {
            return new Promise(resolve => {
                getTopMenu().then((res) => {
                    const data = res.data.data || []
                    resolve(data)
                })
            })
        },
        //获取系统菜单
        GetMenu({ commit }, parentId) {
            return new Promise(resolve => {
                getMenu(parentId).then((res) => {
                    const data = res.data.data
                    let menu = deepClone(data);
                    menu.forEach(ele => formatPath(ele, true));
                    commit('SET_MENUALL', menu)
                    commit('SET_MENU', menu)
                    resolve(menu)
                })
            })
        },
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            setToken(token)
            state.token = token;
            setStore({ name: 'token', content: state.token })
        },
        SET_REFRESH_TOKEN: (state, token) => {
            state.refreshToken = token;
            setStore({ name: 'refreshToken', content: state.token })
        },
        SET_MENUID(state, menuId) {
            state.menuId = menuId;
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_MENUALL: (state, menuAll) => {
            let menu = state.menuAll;
            menuAll.forEach(ele => {
                let index = menu.findIndex(item => item.path == ele.path)
                if (index == -1) {
                    menu.push(ele);
                } else {
                    menu[index] = ele;
                }
            })
            state.menuAll = menu
            setStore({ name: 'menuAll', content: state.menuAll })
        },
        SET_MENUALL_NULL: (state) => {
            state.menuAll = []
            setStore({ name: 'menuAll', content: state.menuAll })
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
            setStore({ name: 'menu', content: state.menu })
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSION: (state, permission) => {
            state.permission = {};
            permission.forEach(ele => {
                state.permission[ele] = true;
            });
        }
    }

}
export default user
