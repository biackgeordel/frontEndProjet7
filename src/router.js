import Vue from 'vue';
import vueRouer from 'vue-router';
import CreateForm from './components/user/CreateForm.vue';
import TheForm from './components/user/TheForm.vue';
import Accueil from './components/user/Accueil.vue';
import TheNewMessage  from './components/user/TheNewMessage.vue';
import UserHome from './components/user/UserHome.vue';
//on ajoute vueRouter comme plugin a Vue
Vue.use(vueRouer);
//on export une instance vueRouter
export default new vueRouer({
    mode:'history',
    routes:[
            {
                path:'/',
             redirect:'/login'
                  
            
            },
        {
            path:'/signup',
            name:'createdCompte',
            component:CreateForm,
            beforeEnter:(to,from,next)=>{
                console.log({
                    to,from
                });
                
                next();
            }

            
        },
        {
            path:'/Accueil/:user',
            component:Accueil,
            children:[
                {
                    path:'',
                     component:UserHome,
                     name:'home',
                     props:true
                      },
                {
                path:'new-message',
                name:'new',
                 component:TheNewMessage,
                 props:true
                  },
                

                
                
                ]
        },
        {
            path:'/test',
            redirect:'/Accueil'
        },

        {
            path:'/login',
            name:'connexion',
            component:TheForm

        },
   







    ]

})