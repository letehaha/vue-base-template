import Vue from 'vue';
import Vuelidate from 'vuelidate';

import clickOutsideDirective from '@/vue/directives/click-outside';

import App from './App';
import router from './vue-router';
import store from './vuex';

async function init() {
  Vue.use(Vuelidate);

  Vue.config.productionTip = false;

  Vue.directive('click-outside', clickOutsideDirective);

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}

init();
