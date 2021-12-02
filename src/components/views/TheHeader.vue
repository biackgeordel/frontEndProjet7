<template>
        <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-info">

          <a class="navbar-brand" href="#">
              <img class="img-fluid" src="../../assets/icon-left-font-monochrome-white.png" alt="logo du site"/> 
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
            <ul  v-else class="navbar-nav ">

              <li class="nav-item">
                  <router-link  class="nav-link"  
                    :class="{active:lien==='profil'}"
                    :to="{name:'profil',params:{user:user}}"> {{ user }} <i class="bi bi-person-circle"></i>
                  </router-link>
              </li>

              <li class="nav-item">
                <!--bouton pour afficher le modal-->
                <a @click.prevent="test=!test" class="nav-link  position-relative"
                  data-bs-target="#staticBackdrop"
                  aria-current="page">
                  Notification <i class="bi bi-bell"></i>
                  <!--compteur de nombre de commentaires-->
                  <span class="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                  </span>
                </a>
                   <div v-show="test"   @mouseleave="test=!test" class="content-principal">
                              <div class="title " style="height:20vw">
                                Notification 

                              </div>
                             <!-- <div class="body">
                                  <div v-for="(vals,index) in commentaires" :key="index">
                                    <router-link   :to="{name:'one',params:{id:vals.id}}" 
                                    :id="vals.id" style="cursor:pointer;">
                                        <span style="color:#2f3542">
                                            {{ userMessage(vals.idUser) }}
                                        </span>
                                          <br/>
                                        <span>
                                             a commenté le message {{ messageCommenter(vals.MessageId)}}
                                        </span>
                                         <hr/>
                                     </router-link>
                                  </div>
                              </div>-->
                        
                        </div> 
                    
              </li>
              <li class="nav-item">
                <a   @click.prevent="deconnexion" class="nav-link" aria-current="page">
                    Déconnexion <i class="bi bi-power"></i>
                </a>
                    
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
        user:'',
        test:false
       
      }
  },   mounted(){
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
 },
 methods:{
   deconnexion(){
     this.user="",
     localStorage.removeItem('user');
     localStorage.removeItem('auth');
     this.$router.push({
       path:'/'
     })
   },
   userMessage(idUser){
     let name=""
     const user=this.$store.state.user;
     user.forEach(element => {
       if(element.idUser===idUser){
         name=element.username
         }
       
     });
      return name;

   },
   messageCommenter(idMessage){
     let titre="";
     const message=this.$store.state.message;
     message.forEach(element=>{
       if(element.idMessage===idMessage){
         titre=element.title;
       }

     });
     return titre;

   },
 
 
 }
  
       

}

</script>
<style lang="scss" scoped>
   .navbar-brand{
         width:40%;
        height:100%;
      
       // border:1px solid green;

       img{
            display: inline-block;
            width:25vw;
            height:8vw;
            object-fit: cover;
            padding-left:2%;
        }
    }
    .collapse{
        justify-content: end;
        font-weight:bolder;
    }
    li{
        a{
            cursor: pointer;
            color: white !important;
           font-weight: bold !important;
           text-align: center;
          // border:1px solid red;
           width:15vw;
        }
    }
    .active{
        text-decoration: underline;
        
    }

    .content-principal{
      
     position:absolute;
      right:10%;
      top:80%;
      z-index:1050;
      border-top-left-radius:2vw;
      border-top-right-radius: 2vw;
      width:20vw;
      height:50vh;
      border-top:none;
      outline:none;
      background-color:#17c0eb;
      display: flex;
      align-content: center;
      align-items: center;
      flex-direction: column;
      .title{
        color:white;
        font-weight:bold;
      }

      .body{
        width:100%;
        //text-align:left;
        padding-left:10%;
        margin-right:5%;
        margin-bottom:5%;
         overflow:auto;
         
        a{
          width:100%;
          text-decoration:none;
          color:#1e272e;
          font-weight: bold;
          padding-left:10%;
        
        }
      }
      /* Let's get this party started */
::-webkit-scrollbar {
    width: 5px;
}
 
/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px #ecf0f1;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background:#2980b9;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #ecf0f1;

    
}

    }


   

</style>