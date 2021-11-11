<template>
    <div id="app">
       <header class="header-container container-fluid bg-bottom">
            <nav class="navbar navbar-expand-lg navbar-light">
                    <a class="navbar-brand" href="#">
                    <img class="img-fluid" src="./assets/icon-left-font.png" alt="logo du site"/> 
                 </a>
                   <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                     aria-expanded="false" aria-label="Toggle navigation">
                             <span class="navbar-toggler-icon"></span>
                    </button>
             <div  class="collapse  navbar-collapse" id="navbarSupportedContent">
                 <ul v-if="!user" class=" navbar-nav">
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
                        <li class="nav-item">
                         <router-link  class="nav-link"  
                         :class="{active:lien==='profil'}"
                         :to="{name:'profil',user:user}"> {{user}}<i class="bi bi-person-circle"></i>
                          </router-link>
                        </li>
                        <li class="nav-item">
                                <a  @click.prevent="notice" class="nav-link  position-relative"
                                  aria-current="page" 
                                  data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                 >Notification <i class="bi bi-bell"></i>
                                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {{nombredecommentaires}}
                                    </span></a>
                                <div class="modal fade" id="staticBackdrop"
                                     data-bs-backdrop="static" data-bs-keyboard="false" tabinde>
                                <div class="modal-dialog  modal-dialog-scrollable">
                                  <div class="modal-content">
                                   <div class="modal-header">
                                      <h5 class="modal-title" id="staticBackdropLabel">Notification <span>{{nombredecommentaires}}</span></h5>
                                       <button type="button" class="btn-close"
                                        data-bs-dismiss="modal" aria-label="Close"></button>
                                   </div>
                                   <div class="modal-body">
                                     <div v-for="(vals,index) in commentaires" :key="index">
                                    
                                            <span>{{vals.date}}</span><p>{{vals.description}}</p>
                                            
                                        <hr/>
                                     </div>
                              

                                     </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" 
                                             data-bs-dismiss="modal">fermer
                                         </button>
                                   </div>
                                   </div>
                                   </div>

                                </div>
                        </li>
                        <li class="nav-item">
                             <a   @click.prevent="deconnexion" class="nav-link" aria-current="page"  >Déconnexion <i class="bi bi-power"></i></a>
                        </li>



                    </ul>
                </div>

             

            </nav>
            

        
        </header>

      
        
          <router-view></router-view>    
    
    </div>
</template>



<script>
export default {
  name: 'app',
  components: {  
  },
  data(){
      return {
        user:'',
       
      }
  },
  created(){
    

  },
    mounted(){
    console.log('la route dans app.vue', this.$route.path);
     if(localStorage.getItem('user')){
          this.user=JSON.parse(localStorage.getItem('user')).username;
    console.log('created app :',this.user);
        
  }
    },
  updated(){
    console.log('la route dans app.vue', this.$route.path);
     if(localStorage.getItem('user')){
          this.user=JSON.parse(localStorage.getItem('user')).username;
    console.log('created app :',this.user);
   
        
  }

  },
 computed:{
         lien(){
         
          console.log('computed:',this.$route.name);
           return  this.$route.name;
           
         },
         commentaires(){
           console.log(this.$store.state.message);
           return this.$store.state.commentaire;
        
         }, 
           nombredecommentaires(){
             return this.$store.state.commentaire.length;

           }
     


 },
 methods:{
   deconnexion(){
     this.user="",
     localStorage.removeItem('user');
     this.$router.push({
       path:'/'
     })
   },
   notice(){
     // this.$store.dispatch('fetchMessage');
      console.log('description :',this.$store.state.commentaire);
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
