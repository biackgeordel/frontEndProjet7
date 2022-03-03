<template>
        <header>
        <b-navbar class="navbar  navbar-expand-lg">

          <b-navbar-brand class="navbar-brand" >
              <img class="img-fluid" src="../../assets/icon-left-font-monochrome-white.png" alt="logo du site"/> 
          </b-navbar-brand>
          
            <b-navbar-nav class="nav-bard" v-if="!username">

               <b-nav-item>
                <router-link class="router__lien" :class="{active:lien==='connexion'}" 
                aria-current="page" :to="{name:'connexion'}">
                  Connexion
                </router-link>
                </b-nav-item>

              <b-nav-item >
                <router-link class="router__lien"  
                  :class="{active:lien==='createdCompte'}"
                  aria-current="page" :to="{ name:'createdCompte'}">
                  Créer un compte
                </router-link>
              </b-nav-item>
                     
            </b-navbar-nav>
            <b-navbar-nav class="nav-bard-user" v-else >
                <div class="cont-item">
                     <b-nav-item>
                        <router-link :class="{active:lien==='home'}"
                          :to="{name:'home'}">Accueil</router-link>                   
                      </b-nav-item>
                      <b-nav-item>
                        <router-link :class="{active:lien==='new'}" 
                        :to="{name:'new'}">Partager  une image <b-icon icon="camera" font-scale="1.5">
                        </b-icon></router-link>                    
                      </b-nav-item>

                </div>
                <div  class="cont-item">
                       <b-nav-item>
                          <router-link :class="{active:lien==='profil'}"
                            :to="{name:'profil',params:{username:username}}"> {{ username }} 
                            <b-icon icon="person-circle"></b-icon>
                          </router-link>
                        </b-nav-item>
                        <b-nav-item   @click.prevent="deconnexion">
                           <b-link href="#">
                             Déconnexion <b-icon  icon="power"></b-icon>
                           </b-link>    
                         </b-nav-item>
                  
                </div> 
            

         
            </b-navbar-nav>
       </b-navbar>
   </header>

</template>
<script>

export default{
    name:"TheHeader",
    data(){
      return {
        username:'',
        test:false
       
      }
  },   created(){
    console.log('la route dans app.vue', this.$route.path);
     if(localStorage.getItem('user')){
          this.username=JSON.parse(localStorage.getItem('user')).username;
    console.log('created app :',this.username);
        
  }
    },
  updated(){
  
     if(localStorage.getItem('user')){
          this.username=JSON.parse(localStorage.getItem('user')).username;
    console.log('updated :',this.username);
   
    }else{
      this.username="";
    }      
  },
 computed:{
         lien(){
         
          console.log('computed:',this.$route.name);
           return  this.$route.name;
           
         },
         commentaires(){
           return this.commentaire
         }
 },
 methods:{
   deconnexion(){
     this.username="",
     localStorage.removeItem('user');
     localStorage.removeItem('auth');
     this.$router.push({
       path:'/'
     })
   },
 }
  
       

}

</script>
<style lang="scss" scoped>

.navbar{
  background-color: #8e44ad;
  display:flex;
  @media(max-width:950px){
    display: flex;
    flex-direction: column;
  }
}
.navbar-brand{
         width:40%;
        height:100%;
        @media(max-width:950px){
            width:100%;
            text-align: center;
     
        }
      
       // border:1px solid green;

       img{
            display: inline-block;
            width:25vw;
            height:8vw;
               @media(max-width:950px){
                width:80vw;
                height:15vw;
     
              }
            object-fit: cover;
            padding-left:2%;
        }
    }
     a{
         width:inherit;
        //border:1px solid #D980FA;
         //border-radius:50px;
         height:inherit; 
          white-space: nowrap;
         text-decoration: none;
         color:#e6c2f1;//#ffffff;
          @media(max-width:950px){
              font-size:3vw;
     
              }
     
    }
 
    .active{
        color:#ffffff;
        }

    .nav-bard-user{
      display: flex;
      flex-direction: row;
      justify-content:flex-start;
     // align-items: center;
     // border: 1px solid red;
      width:60%;
      @media(max-width:950px){
        width:100%;
        flex-direction: column !important;
         
      }
    }
    .nav-bard{
     
    // border:1px solid red;
      width:40%;
      position:relative;
      left:15%;
      @media(max-width:950px){
        width:100%;
        justify-content: space-between;
        left:0;
      }
      &>li>a{
        width:50%;
       // border:1px solid red;
        width: max-content;
      }
    }
 
    li{
  
      transform: scale(1);
       display: inline-block;
       border:1px solid #D980FA;
       border-radius:10px;
       margin:2%;
        width:inherit;
        height: inherit;
        text-align: center;
         transition:all,0.5s ease-in-out;
    
        &:hover{
            border:1px solid #ffffff;
         background-color:#ffffff;
         color:#D980FA;
          transform: scale(1.1);
          transition:all,0.5s ease-in-out;
          &>a a{
            color:#8e44ad;
          }
  
         }
             &>a {
          display: inline-block;
          width: max-content;
       
           
          }
      }
       .cont-item{
         display: flex;
         width:50%;
        // border:1px solid green;
         justify-content: center;
        @media(max-width:950px){
          width:100%;
         }

     
       }
        
  
    
 
</style>