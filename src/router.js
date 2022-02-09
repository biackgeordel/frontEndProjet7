import Vue from 'vue';
import vueRouer from 'vue-router';
import CreateForm from './components/user/CreateForm.vue';
import TheForm from './components/user/TheForm.vue';
import Accueil from './components/views/Accueil.vue';
import TheNewMessage  from './components/user/TheNewMessage.vue';
import UserHome from './components/views/UserHome.vue';
import Profil from './components/user/Profil-user.vue';
import OneMessage from './components/user/OneMessage.vue';
//on ajoute vueRouter comme plugin a Vue
Vue.use(vueRouer);
//on export une instance vueRouter
export default new vueRouer({
    mode:'history',
    routes:[
            {
                path:'/',
             redirect:'/login',   
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
            path:"/Accueil/:user",
            component:Accueil,
            beforeEnter:(to,from,next)=>{
                if(localStorage.getItem('auth')){
            
                    next();
                }else{
                  next('/')
                }
                
                
            },
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
                  {
                    path:'message/:id',
                    name:"one",
                    component:OneMessage,
                    props:true
                    
                },
                {
                    path:'profil',
                    name:'profil',
                    component:Profil,
                    props:true
                  
                },    
                ]
        },

        {
            path:'/login',
            name:'connexion',
            component:TheForm,
            beforeEnter:(to,from,next)=>{
                if(localStorage.getItem('user')){
                    localStorage.removeItem('user');
                    next();
                }else{
                  next()
                }
                
                
            },
      
        },
       {
            path:'*',
            redirect:'/'
        }
    
   
    
   
    ]

})