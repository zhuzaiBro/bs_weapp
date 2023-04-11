import Router, { RouteConfig } from "cheers-mp-router";


// 定义路由配置
const routeConfigList: RouteConfig[] = [
  { name: "index", path: "pages/index/index", isTab: true },
  { name: "mine", path: "pages/mine/mine", isTab: true },
  { name: "testB", path: "test/pages/testB/index" },
  { name: "product-details", path: "test/pages/product-details/index" }
];

// 实例化
const router = new Router({ routes: routeConfigList });

// 注册全局 beforeEach 钩子；使用方式和 vue-router 的 beforeEach 基本一致
router.beforeEach((to, from, next) => {
  console.log("当前路由", from);
  console.log("即将前往的路由", to);
  next();
  // next({ name: "pageB" });
  // next(false)
});

// 注册全局 afterEach 钩子
router.afterEach((current, from) => {
  console.log("跳转成功，当前路由:", current);
  console.log("之前路由:", from);
});


export default router;

// 调用路由方法
// router.push({ name: "testA" })

// 调用路由传参数
// router.push({ name: "product-details", query: { id: "sb" } })