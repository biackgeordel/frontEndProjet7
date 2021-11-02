import Vue from 'vue'
import router from './router'
import App from './App.vue'
import axios from 'axios';
Vue.prototype.$http=axios;// on crée un prototype $http pour le rendre accessible sous $http

//axios.defaults.headers.common['authorization']='12233';
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
    message:[{
      id:1,
      urlImage:"https://gifsdomi.files.wordpress.com/2012/06/gif-accident-20.gif",
      description:"Vous voulez faire rire un ami ou une ami avec un sms marrant "+
      "Vous voulez consoler une personne plongée dans la tristesse suite à une mauvais nouvelle ou à un échec ? Vous voulez faire une déclaration d’amour avec humour ? Pourquoi ne pas envoyer un texto rigolo sous forme d’une petite blague",
      title:"accident mortel",
      userId:"1",
      idMessage:"123"
    },
    {
      id:2,
      urlImage:"https://gifsdomi.files.wordpress.com/2012/06/gif-accident-20.gif",
      description:"Vous voulez faire rire un ami ou une ami avec un sms marrant "+
      "Vous voulez consoler une personne plongée dans la tristesse suite à une mauvais nouvelle ou à un échec ? Vous voulez faire une déclaration d’amour avec humour ? Pourquoi ne pas envoyer un texto rigolo sous forme d’une petite blague",
      title:"accident mortel",
      userId:"1",
      idMessage:"123"
    },
    {
      id:3,
      urlImage:"https://gifsdomi.files.wordpress.com/2012/06/gif-accident-20.gif",
      description:"Vous voulez faire rire un ami ou une ami avec un sms marrant "+
      "Vous voulez consoler une personne plongée dans la tristesse suite à une mauvais nouvelle ou à un échec ? Vous voulez faire une déclaration d’amour avec humour ? Pourquoi ne pas envoyer un texto rigolo sous forme d’une petite blague",
      title:"accident mortel",
      userId:"1",
      idMessage:"123"
    }
    ],
    commentaire:[],
     /*{ description:String,
        date:{}
      like:0,
      dislikes:0,
      userId:String,
      idMessage:"123",
      possiblde de creer une table
      likesUser:[],
      dislikesUser:[]


    }*/
    page:'CreateForm'

  },
  methods:{
    changerUser(user){
      this.user=user;
      this.$emit('update:user',this.user);
    },

    changerPage(page){
      this.page=page;
      console.log(this.page);
      this.$emit('update:page',this.page); 

    },
    ajouterCommentaire(msg){
        this.message.forEach((message)=>{
          console.log("valeur  id message :"+message.id);
          console.log("valeur  id commentaire :"+msg.id);

          if(msg.id===message.id){
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
  router,
  render: h => h(App),
}).$mount('#app')
