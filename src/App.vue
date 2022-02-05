<template>
  <div id="app">
        <the-header></the-header>
        <router-view></router-view>    
    
  </div>
</template>



<script>
//import { mapState } from 'vuex';
import TheHeader from "./components/views/TheHeader.vue";
export default {
  name: 'app',
  components: {  
    TheHeader
  },
  created(){
   // this.$store.dispatch('fetchGetCommentaire');
  },
  computed:{
   /* ...mapState([
      'commentaire'
    ]
      
    )*/
  }

}

  
</script>

<style lang="scss">
#app{
 font-family: 'Heebo', sans-serif;
}
</style>
