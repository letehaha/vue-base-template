import Vue from 'vue';
import VueRouter from 'vue-router';
import { vueRoutes } from './routes';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  ...Object.values(vueRoutes),
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 200);
    });
  },
});

export default router;
