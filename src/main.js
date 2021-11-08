import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store';
import axios from 'axios';
Vue.prototype.$http=axios;// on crée un prototype $http pour le rendre accessible sous $http

axios.defaults.headers.common['authorization']='12233'
axios.defaults.baseURL="http://localhost:3000/api/auth"
axios.interceptors.request.use((req)=>{
  console.log(req)
  return req;
});
/*axios.interceptors.response.use((res)=>{
  console.log(res)
  return res;
})*/

Vue.config.productionTip = false;
 export const eventBus=new Vue({

  data:{
    user:{
      username:'',
      idUser:''
    },
    message:[],
    commentaire:[],


  },
  methods:{
    changerUser(user){
      this.user=user;
      this.$emit('update:user',this.user);
    },
    ajouterCommentaire(msg){
        this.message.forEach((message)=>{
          console.log("valeur  id message :"+message.idMessage);
          console.log("valeur  id commentaire :"+msg.idMessage);

          if(msg.idMessage===message.idMessage){
            console.log("message ok");
            this.commentaire=[...this.commentaire,msg];
            this.commentaire.slice(msg);
            this.$emit('update:commentaire',this.commentaire);
          }


        });
      },
}
 });

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
