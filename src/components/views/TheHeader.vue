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
    //height:30vw;
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
     //border: 1px solid red;
      width:60%;
      @media(max-width:950px){
        width:100%;
        flex-direction: column !important;
         
      }
      
      
    }
    //balise nav sur la page login signup
    .nav-bard{
     
    // border:1px solid red;
      width:40%;
      position:relative;
      left:15%;
      justify-content:center;

      @media(max-width:950px){
        width:100%;
        left:0;
      }
      &>li>a{
       // border:1px solid red;
        width: max-content;
      }
    }
 
    li{
  
      transform: scale(1);
       display: inline-block;
       border:1px solid #D980FA;
       border-radius:8px;
       margin:2%;
        text-align: center;
         transition:all,0.5s ease-in-out;
         @media(max-width:950px){
           height:50.5%;
           padding:0.5%;
         }
    
        &:hover{
            border:1px ridge transparent;
         background-color:#ffffff;
         color:hsl(284, 92%, 74%);
         box-shadow: 0px -1px 1px 2px rgba(12, 11, 11,0.1);
          transform: scale(1.1);
          transition:all,0.5s ease-in-out;
          &>a a{
            color:#8e44ad;
               
          }
  
         }
             &>a {
          display: inline-block;
          width:inherit;
          height: inherit;    
          }
      }
       .cont-item{
         display: flex;
         width:50%;
        // border:1px solid green;
         justify-content:flex-end;
         &:last-child{
         justify-content:flex-start; 
           @media(max-width:950px){
           justify-content:center;
           } 
         }
        @media(max-width:950px){
           justify-content:center;
          width:100%;
          height:15vw;
          align-items: center;
         }

     
       }
       .nav-link{
         @media(max-width:950px){
           padding:0;
         }
       }
        
  
    
 
</style>