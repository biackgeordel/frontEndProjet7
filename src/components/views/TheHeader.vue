<template>
        <header>
        <b-navbar class="navbar navbar-expand-lg navbar-dark bg-info">

          <b-navbar-brand class="navbar-brand" href="#">
              <img class="img-fluid" src="../../assets/icon-left-font-monochrome-white.png" alt="logo du site"/> 
          </b-navbar-brand>
          
            <b-navbar-nav class="nav-bard" v-if="!username">

              <b-nav-item >
                <router-link  :test="lien" 
                
                  :class="{active:lien==='connexion'}"
                  aria-current="page" :to="{name:'connexion'}">
                  Connexion
                </router-link>
              </b-nav-item>

              <b-nav-item >
                <router-link  :test="lien" 
                  :class="{active:lien==='createdCompte'}"
                  aria-current="page" :to="{ name:'createdCompte'}">
                  Créer un compte
                </router-link>
              </b-nav-item>
                     
            </b-navbar-nav>
            <b-navbar-nav class="nav-bard" v-else >

              <b-nav-item>
                  <router-link 
                    :class="{active:lien==='profil'}"
                    :to="{name:'profil',params:{username:username}}"> {{ username }} <b-icon icon="person-circle"></b-icon>
                  </router-link>
              </b-nav-item>

              <b-nav-item>
                <!--bouton pour afficher le modal-->                        
              </b-nav-item>
              <b-nav-item   @click.prevent="deconnexion">
                <b-link href="#">
                       Déconnexion <b-icon  icon="power"></b-icon>
                </b-link>
                 
                
                    
              </b-nav-item>
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
  },   mounted(){
    console.log('la route dans app.vue', this.$route.path);
     if(localStorage.getItem('user')){
          this.username=JSON.parse(localStorage.getItem('user')).username;
    console.log('created app :',this.username);
        
  }
    },
  updated(){
    console.log('la route dans app.vue', this.$route.path);
     if(localStorage.getItem('user')){
          this.username=JSON.parse(localStorage.getItem('user')).username;
    console.log('created app :',this.username);
   
        
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
      text-decoration: none;
      color:black;
      font-family: "Roboto",sans-serif;
          @media(max-width:950px){
              font-size:3vw;
     
              }
     
    }
    .active{
      border-bottom:4px solid white;
      padding-bottom:5px ;
    
    }
    .comments{
      width:100%;
      padding:2%;
      margin-bottom:2%;
      color:#2c3e50;
      cursor:pointer;
      height:10vh;
      &:hover{
        background-color:#95a5a6;
        transition:all,0.9s ease-in-out;
      }

    }
    .nav-bard{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60%;
      @media(max-width:950px){
        justify-content: space-around;
        width:100%;
      }
    }
 
</style>