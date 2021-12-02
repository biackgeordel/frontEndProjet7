import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store';
import axios from 'axios';
Vue.prototype.$http=axios;// on crée un prototype $http pour le rendre accessible sous $http


axios.defaults.baseURL="http://localhost:3000/api/auth"
axios.interceptors.request.use((req)=>{
  console.log(req)
  return req;
});
axios.interceptors.response.use((res)=>{
  console.log(res);
  console.log('mon token:',res.data.token);
  if(res.data.token){
    axios.defaults.headers.common['authorization']=res.data.token;
  }
 
  return res;
});


Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
