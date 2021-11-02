<template>
   <section class="container-fluid">
     <nav class="navbar navbar-light bg-light">
         <div class="container-fluid">
                   <router-link class="navbar-brand" :to="{name:'home'}">Accueil</router-link>
         
           <router-link class="navbar-brand" :to="{name:'new'}">Publier une image</router-link>
         </div>
     </nav>
    
         <router-view></router-view>    
    </section> 
</template>

<script>
export default {
  name: 'Accueil',   
  computed:{
        routeCourant(){
          console.log( 'route courant', this.$route.name);
          return ' '
        }
      },
      created(){
        

      }
  }
  
</script>

<style lang="scss" scoped>
</style>
