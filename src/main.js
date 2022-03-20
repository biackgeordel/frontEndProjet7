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
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {faThumbsDown} from '@fortawesome/free-solid-svg-icons'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {faUserGear} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faHeart,faThumbsUp,faThumbsDown,faTrashCan,faPen,faUserGear,faUser);

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
axios.interceptors.response.use(res=>{
  console.log('response:',res);
  return res;

});


axios.interceptors.response.use((res)=>{
 
  return res;
});

//directive global
Vue.directive('zoneText', {
inserted: function (el) {
    console.log(el);
    el.style.overflow="break-word";
    el.style.borderRadius="2vw";
     el.style.lineHeight="1.5";
     el.style.padding="1.5% 3%";
     el.style.backgroundColor="rgba(123, 237, 159,1.0)";
     
    
     if(el.innerText.length<6){
         el.style.width="17%"
         el.style.textAlign="center"
     }
       else if(el.innerText.length<11){
         el.style.width="22%"
         el.style.textAlign="center"
           //el.style.border="1px solid red";
     }
     else if(el.innerText.length<21){
         //el.style.border="1px solid red";
       el.style.width="40%";
       el.style.textAlign="center"
      // el.style.lineHeight="1.2";  
     }
     else if(el.innerText.length<61){
         el.style.width="50%";
          el.style.lineHeight="1.2";  
         
     }else if(el.innerText.length<101){
           el.style.width="80%"
          el.style.lineHeight="1.2";  
              //el.style.border="1px solid red";
     } else{
         el.style.width="100%";
           el.style.borderRadius="2vw";
     }      

  }
})

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
