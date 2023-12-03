import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.VUE_ROUTER_BASE
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createWebHistory(),
    // history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Router.beforeEach((to, from, next) => {
  //   if (to.name !== 'Login' && !isAuthenticated()) next({ name: 'Login' })
  //   else next()
  // })

  return Router;
});

const LOCAL_TOKEN = process.env.VUE_LOCAL_TOKEN;
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return LOCAL_TOKEN === token;
}
