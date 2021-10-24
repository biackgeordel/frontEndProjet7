<template>
        <header class="header-container container-fluid">
            <nav class="navbar navbar-expand-lg navbar-light bg-light container-fluid border-bottom">
                    <a class="navbar-brand" href="#">
                    <img class="img-fluid" src="../../assets/icon-left-font.png" alt="logo du site"/> 
                 </a>
                   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                             <span class="navbar-toggler-icon"></span>
                    </button>
             <div  class="collapse  navbar-collapse" id="navbarSupportedContent">
                 <ul v-if="!user.email" class=" navbar-nav">
                           <li class="nav-item" >
                            <a class="nav-link " aria-current="page">Connexion</a>
                        </li>
                        <li class="nav-item">
                             <a class="nav-link" aria-current="page"  >Créer un compte</a>
                        </li>
                     
                    </ul>
                    <ul v-else class=" navbar-nav">
                         <li class="nav-item" >
                            <a class="nav-link " aria-current="page">{{user.email}} <i class="bi bi-person-circle"></i></a>
                        </li>
                          <li class="nav-item">
                             <a class="nav-link" aria-current="page"  >Notification <i class="bi bi-bell"></i></a>
                        </li>
                        <li class="nav-item">
                             <a class="nav-link" aria-current="page"  >Déconnexion <i class="bi bi-power"></i></a>
                        </li>



                    </ul>
                </div>
            </nav>
    
        </header>

</template>


<script>
import { eventBus } from '../../main';
export default{
    name:"TheHeader",
    data(){
        return{
            //id de l'user
            user:eventBus.user
        
        
          
    }},
    methods:{
    
    },
    created(){
        this.user=eventBus.user;
        console.log("nouvelle user eventBus");
        console.log(this.user);
        eventBus.$on('update:user',(user)=>{
            this.user=user;
        });
    }
    

    

}

</script>
<style lang="scss">
    .container-fluid{
       //border:1px solid red;
        width:100%;
    }
    .navbar-brand{
         width:40%;
        height:100%;
       // border:1px solid green;

       img{
            display: inline-block;
            width:100%;
            height:80px;
            object-fit: cover;
        }
    }
    .collapse{
        justify-content: end;
        font-weight:bolder;
    }
    li{
        a{
            cursor: pointer;
        }
    }
 
  


</style>