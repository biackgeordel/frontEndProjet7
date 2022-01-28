import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store';
import { BootstrapVue, IconsPlugin,BootstrapVueIcons } from 'bootstrap-vue';
import axios from 'axios';
Vue.prototype.$http=axios;// on crée un prototype $http pour le rendre accessible sous $http
axios.defaults.baseURL="http://localhost:3000/api/auth";
//axios.defaults.headers.common['authorization']=JSON.stringify(localStorage.getItem('auth'));
axios.interceptors.request.use((req)=>{
    if(localStorage.getItem('auth')){
      req.headers.authorization=localStorage.getItem('auth');
    }
  
  console.log(req)
  return req;
});


axios.interceptors.response.use((res)=>{
  console.log(res);
  console.log('mon token:',res.data.token);
   /* if(res.data.token){
      
    }*/

 
  return res;
});
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);


Vue.config.productionTip = false;

new Vue({
  store,
  router,
  BootstrapVue,
  IconsPlugin,
  BootstrapVueIcons,
  render: h => h(App),
}).$mount('#app')
