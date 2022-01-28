<template>
   <section>
     
       <div class="cont">
     <nav  class="navbar  navbar-expand-lg navbar-light bg-light">
         <div class="container-fluid">
              <a class="navbar-brand" href="#"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
            <div class="collapse navbar-collapse" id="navbarText">
                 <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                     <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'home'}">Accueil</router-link>
                     </li>
                     <li class="nav-item">
                     <router-link class="nav-link" :to="{name:'new'}">Partager  une image <b-icon icon="camera" font-scale="1.5"></b-icon></router-link>
                     </li>

                 </ul>
            </div>
         </div>
     </nav>
    
                         <router-view></router-view>    
                     </div>              
    </section> 
</template>

<script>
export default {
  name: 'Accueil',   
}
  
</script>

<style lang="scss" scoped>

.router-link-exact-active{
  font-weight: bold;
 

}
    .cont{
      background-color:#f1f2f6;
    }
    
</style>
