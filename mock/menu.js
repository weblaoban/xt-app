
function randomColor () {
  return '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
}
const top = [{
  label: "首页",
  path: "/wel/index",
  icon: 'el-icon-document',
  meta: {
    i18n: 'dashboard',
  },
  parentId: 0
},
{
  label: "测试",
  icon: 'el-icon-document',
  path: "/test",
  meta: {
    i18n: 'test',
  },
  parentId: 1
},
{
  label: "更多",
  icon: 'el-icon-document',
  path: "/wel/more",
  meta: {
    menu: false,
    i18n: 'more',
  },
  parentId: 2
}]
const first = []
const second = []
let menu = [first, second];
export default [{
  url: "/user/getMenu",
  method: "get",
  response: ({ query }) => {
    return {
      data: menu[query.type || 0] || []
    }
  }
}, {
  url: "/user/getTopMenu",
  method: "get",
  response: () => {
    return {
      data: top
    }
  }
}]