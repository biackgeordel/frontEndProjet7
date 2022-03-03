import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
/* import specific icons */
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {faFaceGrinBeam} from '@fortawesome/free-regular-svg-icons';
import {faFaceFrown} from '@fortawesome/free-regular-svg-icons'
/* add icons to the library */
library.add(faHeart,faFaceGrinBeam,faFaceFrown);

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.prototype.$http=axios;// on crée un prototype $http pour le rendre accessible sous $http
axios.defaults.baseURL="http://localhost:3000/api/auth";
axios.interceptors.request.use((req)=>{
    if(localStorage.getItem('auth')){
      req.headers.authorization=localStorage.getItem('auth');
    }
  
  console.log(req)
  return req;
});


axios.interceptors.response.use((res)=>{
 
  return res;
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
