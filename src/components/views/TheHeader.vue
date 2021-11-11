<template>
        <header class="header-container container-fluid bg-bottom">
            <nav class="navbar navbar-expand-lg navbar-light">
                    <a class="navbar-brand" href="#">
                    <img class="img-fluid" src="../../assets/icon-left-font.png" alt="logo du site"/> 
                 </a>
                   <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                     aria-expanded="false" aria-label="Toggle navigation">
                             <span class="navbar-toggler-icon"></span>
                    </button>
             <div  class="collapse  navbar-collapse" id="navbarSupportedContent">
                 <ul v-if="!pseudo" class=" navbar-nav">
                          <li class="nav-item" >
                             <router-link  :test="lien" 
                             class="nav-link"
                             :class="{active:lien==='connexion'}"
                              aria-current="page" :to="{name:'connexion'}">
                              Connexion
                              </router-link>
                        </li>
                        <li class="nav-item">
                     
                             <router-link class="nav-link"  :test="lien" 
                             :class="{active:lien==='createdCompte'}"
                                 aria-current="page" :to="{ name:'createdCompte'}">
                                 Créer un compte
                              </router-link>
                        </li>
                     
                    </ul>
                   <ul  v-else class=" navbar-nav">
                         <li class="nav-item" >
                            <a class="nav-link " aria-current="page">{{pseudo}} <i class="bi bi-person-circle"></i></a>
                        </li>
                          <li class="nav-item">
                             <a class="nav-link" aria-current="page"  >Notification <i class="bi bi-bell"></i></a>
                        </li>
                        <li class="nav-item">
                             <a   @click.prevent="deconnexion" class="nav-link" aria-current="page"  >Déconnexion <i class="bi bi-power"></i></a>
                        </li>



                    </ul>
                </div>
            </nav>
        
        </header>

</template>
<script>

export default{
    name:"TheHeader",
    data(){
        return {
            pseudo:""
        }
    },
    created(){
        if(localStorage.getItem('user')){
            const tab=this.$store.state.user;
            tab.forEach(element=>{
                if(element===JSON.parse(localStorage.getItem('user')).idUser){
                    this.pseudo=element.username;
                }

            });
        }
    },

        methods:{
            deconnexion(){
                localStorage.removeItem('user');
                this.pseudo="";
                         this.$router.push({
                    path:'/'
                })
             
            },
        },
     
     computed:{
         lien(){
             console.log('computed:',this.$route.name);
           return  this.$route.name;
           
         },
      
     
        }
    
       

}

</script>
<style lang="scss">
    .container-fluid{
    
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
    .active{
        text-decoration: underline;
        
    }
 
  


</style>